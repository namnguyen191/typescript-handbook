export {};
class BuilderTuple<TList extends any[] = []> {
  list: TList;

  constructor() {
    this.list = [] as any;
  }

  push<TNum extends number>(num: TNum): BuilderTuple<[...TList, TNum]> {
    this.list.push(num);

    return this as any;
  }
}

const builderTup = new BuilderTuple();
const newBuilderTup = builderTup.push(1).push(2).push(3);

// Default generic give the builder an initial value to infer
class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap = {} as any;

  get(key: keyof TMap) {
    return this.map[key];
  }

  set<TKey extends string>(
    key: TKey,
    value: string
  ): TypeSafeStringMap<TMap & Record<TKey, string>> {
    (this.map[key] as any) = value;

    return this as any;
  }
}

const safeMap = new TypeSafeStringMap()
  .set('name', 'Nam Nguyen')
  .set('age', '25');
safeMap.get('age');
safeMap.get('name');

type Middleware<TInput, TOutput> = (
  input: TInput
) => TOutput | Promise<TOutput>;
class DynamicMiddleware<TInput, TOutput> {
  private middlewares: Middleware<any, any>[] = [];

  constructor(firstMiddleware: Middleware<TInput, TOutput>) {
    this.middlewares.push(firstMiddleware);
  }

  use<TNewOutput>(
    middleware: Middleware<TOutput, TNewOutput>
  ): DynamicMiddleware<TInput, TNewOutput> {
    this.middlewares.push(middleware);
    return this as any;
  }

  async run(input: TInput): Promise<TOutput> {
    let result: TOutput = input as any;
    for (const middleware of this.middlewares) {
      result = await middleware(result);
    }

    return result;
  }
}
const middlewares = new DynamicMiddleware((req: { url: string }) => ({
  ...req,
  user: { id: 1, name: 'Nam' }
}))
  .use((req) => ({ ...req, userId: req.user.id }))
  .use(async (req) => {
    return {
      ...req,
      books: await Promise.resolve(['Book 1', 'Book 2'])
    };
  });

const result = await middlewares.run({ url: 'http://ibm.com' });

type PayloadToDiscriminatedUnion<T extends Record<string, any>> = {
  [K in keyof T]: { type: K } & T[K];
}[keyof T];
class Reducer<TState, THandlers extends Record<string, any> = {}> {
  handlers = {} as THandlers;

  addHandler<TType extends string, TPayload extends Record<string, any> = {}>(
    type: TType,
    handler: (...args: [state: TState, payload: TPayload]) => TState
  ) {
    (this.handlers[type] as any) = handler;
    return this as any as Reducer<TState, THandlers & Record<TType, TPayload>>;
  }

  reduce(
    state: TState,
    action: PayloadToDiscriminatedUnion<THandlers>
  ): TState {
    const handler = this.handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  }
}

type AppState = {
  username: string;
  password: string;
};

const reducer = new Reducer<AppState>()
  .addHandler(
    'LOG_IN',
    (_state, payload: { username: string; password: string }) => ({
      username: payload.username,
      password: payload.password
    })
  )
  .addHandler('LOG_OUT', () => ({ username: '', password: '' }))
  .addHandler('MODIFY_USER_TO_NAM', (state) => ({ ...state, username: 'NAM' }))
  .addHandler('SHOW_ADMIN', (_state, payload: { adminName: string }) => ({
    username: payload.adminName,
    password: 'admin'
  }));

const state1 = reducer.reduce(
  { username: '', password: '' },
  { type: 'LOG_IN', username: 'foo', password: 'bar' }
);
const state2 = reducer.reduce(
  { username: 'foo', password: 'bar' },
  { type: 'LOG_OUT' }
);
const state3 = reducer.reduce(
  { username: 'foo', password: 'bar' },
  { type: 'SHOW_ADMIN', adminName: 'Nam' }
);
const state4 = reducer.reduce(
  { username: 'foo', password: 'bar' },
  { type: 'MODIFY_USER_TO_NAM' }
);
