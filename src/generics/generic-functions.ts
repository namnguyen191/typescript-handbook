// Basic
const returnWhatIPassedIn = <T>(t: T): T => {
  return t;
};
const returnValue1 = returnWhatIPassedIn<{ test: true }>({ test: true });

// With constrains
const returnWhichStringIPassedIn = <T extends string>(t: T): T => {
  return t;
};
const returnValue2 = returnWhichStringIPassedIn<'Nam'>('Nam');

// Multiple generics
const returnBothOfWhatIsPassedIn = <T1, T2>(a: T1, b: T2) => {
  return {
    a,
    b
  };
};
const returnValue3 = returnBothOfWhatIsPassedIn<boolean, 123>(true, 123);

// Convert using mapper
const sum = <T>(array: readonly T[], mapper: (item: T) => number): number => {
  return array.reduce((acc, cur) => acc + mapper(cur), 0);
};
const testArr = ['1', '2', '3', '4'];
const mapper = (item: string) => parseInt(item);
const sumResult = sum(testArr, mapper);

// Extends generic
const appendUserId = <T extends { firstName: string; lastName: string }>(
  user: T
): T & { userId: string } => {
  return {
    ...user,
    userId: `${user.firstName}.${user.lastName}@ibm.com`
  };
};
const user = {
  firstName: 'Nam',
  lastName: 'Nguyen'
};
const userWithId = appendUserId(user);
userWithId.userId;

// Pass down to another function
const createSet = <T = string>() => {
  return new Set<T>();
};
const testSet = createSet<number>();
const testSetDefault = createSet();

// Generic in array reduce
const people = [
  {
    name: 'Nam'
  },
  {
    name: 'John Doe'
  }
];
const peopleMap = people.reduce<Record<string, { name: string }>>(
  (acc, item) => {
    acc[item.name] = item;
    return acc;
  },
  {}
);

// Using generic to prevent `any` from spreading
const fetchData = async <T>(url: string) => {
  const data: T = await fetch(url).then((res) => res.json());

  return data;
};
const resultFunc = async () => {
  const result = await fetchData<{ name: string }>('https://google.com');
};

// Drilling generic => use generic for something low level
const getHomePageFeatureFlags = <HomePageFlags>(
  config: { rawConfig: { featureFlags: { homePage: HomePageFlags } } },
  override: (flag: HomePageFlags) => HomePageFlags
) => override(config.rawConfig.featureFlags.homePage);
const exampleConfig = {
  rawConfig: {
    featureFlags: {
      homePage: {
        url: '/home',
        showBanner: true,
        injectAds: false
      }
    }
  }
};
getHomePageFeatureFlags(exampleConfig, (flags) => flags);

// Typed Object.keys
const testObj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4'
};
const testObjKeys = Object.keys(testObj);
const improvedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as [keyof T];
};
const betterObjKeys = improvedObjectKeys(testObj);

// Nested function
const makeSafe =
  <TFunc extends (...args: any[]) => any>(func: TFunc) =>
  (
    ...params: Parameters<TFunc>
  ):
    | { type: 'success'; result: ReturnType<TFunc> }
    | { type: 'failure'; error: Error } => {
    try {
      const result = func(...params);
      return {
        type: 'success',
        result
      };
    } catch (e) {
      return {
        type: 'failure',
        error: e as Error
      };
    }
  };
const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}` as const;
};
const getFullNameSafe = makeSafe(getFullName);
getFullNameSafe('Nam', 'Nguyen');

// All generic are attach to the current function => we need to spread them out if we have nested funcs
const curryFuncWrong =
  <TP1, TP2, TP3>(p1: TP1) =>
  (p2: TP2) =>
  (p3: TP3) => ({ p1, p2, p3 });
const testCurryWrong = curryFuncWrong(1)('hello')(true);
const curryFunc =
  <TP1>(p1: TP1) =>
  <TP2>(p2: TP2) =>
  <TP3>(p3: TP3) => ({ p1, p2, p3 });
const testCurry = curryFunc(1)('hello')(true);

// Typing different level of function
type CacheType<T> = {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  clone: <TCloned>(transform: (element: T) => TCloned) => CacheType<TCloned>;
};
const createCache = <T>(initial?: Record<string, T>): CacheType<T> => {
  const cache: Record<string, T> = initial ?? {};
  return {
    get: (key) => cache[key],
    set: (key, val) => (cache[key] = val),
    clone: (transform) => {
      const newCache: Record<string, any> = {};
      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }

      return createCache(newCache);
    }
  };
};
const numberCache = createCache<number>();
numberCache.set('key1', 1);
numberCache.set('key2', 2);
const stringCache = numberCache.clone((ele) => String(ele));
const testStringCache = stringCache.get('key1');

// Reduce number of generic
const returnBothAsTuple = <T extends { t1: unknown; t2: unknown }>(
  args: T
): [T['t1'], T['t2']] => [args.t1, args.t2];
const testTuple = returnBothAsTuple({ t1: 'Birthdate', t2: 1998 });

// Dynamic function args with named param
type DomEvents = {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
};
const sendEvent = <TEvent extends keyof DomEvents>(
  event: TEvent,
  ...args: DomEvents[TEvent] extends undefined
    ? []
    : [payload: DomEvents[TEvent]]
) => {
  // Do something
};
sendEvent('focus');
sendEvent('click', { x: 12, y: 23 });

// Pick problem
const pick = <
  TObject extends Record<string, unknown>,
  TPick extends keyof TObject
>(
  obj: TObject,
  keys: Array<TPick>
): Pick<TObject, TPick> => {
  return keys.reduce(
    (acc, cur) => ({ ...acc, cur: obj[cur] }),
    {} as Pick<TObject, TPick>
  );
};
const objToPick = {
  a: 'Hello',
  b: {
    c: 'World'
  },
  d: true,
  e: 123
};
const pickBDE = pick(objToPick, ['b', 'd', 'e']);

// Form validators factory
type ValidatorFn = (val: string) => string | void;
const createFormValidatorsFactory =
  <TValidatorKeys extends string>(
    validators: Record<TValidatorKeys, ValidatorFn>
  ) =>
  <TConfigKeys extends string>(
    config: Record<TConfigKeys, Array<TValidatorKeys>>
  ) =>
  (obj: Record<TConfigKeys, string>) => {
    const errors = {} as Record<TConfigKeys, Array<string>>;

    for (const objKey in obj) {
      const objVal = obj[objKey];
      const objValidatorKeys = config[objKey];
      errors[objKey] = [];
      for (const validatorKey of objValidatorKeys) {
        const validate = validators[validatorKey];
        const err = validate(objVal);
        if (err) {
          errors[objKey].push(err);
        }
      }
    }

    return errors;
  };

const createFormValidator = createFormValidatorsFactory({
  required: (val) => {
    if (val === '') {
      return 'required';
    }
  },
  minLength: (val) => {
    if (val.length < 5) {
      return 'min length is 5';
    }
  },
  email: (val) => {
    if (!val.includes('@')) {
      return 'not an email';
    }
  }
});

const validateUser = createFormValidator({
  id: ['required', 'minLength'],
  username: ['required', 'minLength'],
  email: ['required', 'email']
});

const errors = validateUser({
  id: '',
  username: 'nam',
  email: 'nam@nam'
});

// Translation problem
type GetParamsKey<TTranslation extends string> = TTranslation extends ''
  ? []
  : TTranslation extends `${string}{{${infer Param}}}${infer Tail}`
  ? [Param, ...GetParamsKey<Tail>]
  : [];
type GetParamsKeyAsUnion<TTranslation extends string> =
  GetParamsKey<TTranslation>[number];
const translate = <
  TTranslations extends Record<string, string>,
  TTranslationKey extends keyof TTranslations,
  TTranslationParams = GetParamsKeyAsUnion<TTranslations[TTranslationKey]>
>(
  translations: TTranslations,
  key: TTranslationKey,
  ...args: TTranslationParams extends string
    ? [paramsArg: Record<TTranslationParams, string>]
    : []
) => {
  const translation = translations[key];
  const params: any = args[0] ?? {};

  return translation.replace(/{{(\w+)}}/g, (_, key) => params[key]);
};
const translationsMap = {
  mainHeader: 'Welcome to my website',
  mainBody: 'This is my personal portfolio',
  ad: 'Sponsor by {{sponsor}}'
} as const;
const mainHeaderTranslate = translate(translationsMap, 'mainHeader'); // Broke in TS 5
const adTranslate = translate(translationsMap, 'ad', { sponsor: 's' });
