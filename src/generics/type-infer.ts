// Literal infer
const itemNotGettingInferLiteral = <T>(t: T) => ({ item: t });
const inferItemLiteral = <T extends string | number>(t: T) => ({ item: t });
const itemToInfer1 = 'Nam Nguyen';
const resultFromItem1 = inferItemLiteral(itemToInfer1);
const nonLiteralResult1 = itemNotGettingInferLiteral(itemToInfer1);
const itemToInfer2 = 123;
const nonLiteralResult2 = itemNotGettingInferLiteral(itemToInfer2);
const resultFromItem2 = inferItemLiteral(itemToInfer2);

// Specify return value to achieve inferal
const helloGoodbye = <TPromp extends 'hello' | 'goodbye'>(
  promp: TPromp
): TPromp extends 'goodbye' ? 'hello' : 'goodbye' =>
  (promp === 'hello' ? 'goodbye' : 'hello') as any;
const hello = helloGoodbye('goodbye');

// Force infer using any
type Person = {
  name: string;
  age: number;
  birthDate: Date;
};
const remapPerson = <TKEY extends keyof Person>(
  key: TKEY,
  value: Person[TKEY]
): Person[TKEY] => {
  if (key === 'birthDate') {
    return new Date() as any;
  }

  return value;
};

// Infer actual key value by adding a 2nd generic
const getValue = <TObject, TKeys extends keyof TObject>(
  obj: TObject,
  key: TKeys
) => {
  return obj[key];
};
const testObj1 = {
  a: 'Hello',
  b: 132,
  c: true
};
const aVal = getValue(testObj1, 'a');
const bVal = getValue(testObj1, 'b');
const cVal = getValue(testObj1, 'c');

// Almost global infer
type CSSProperties = Record<string, string>;

const makeUsedStyled = <TTheme = {}>() => {
  const useStyled = (func: (theme: TTheme) => CSSProperties) => {
    return {};
  };
  return useStyled;
};

type CustomTheme = {
  color: {
    primary: string;
  };
  sizes: {
    'small-btn': string;
  };
  fontSize: {
    normal: string;
  };
};
const useStyled = makeUsedStyled<CustomTheme>();
const buttonStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
  width: theme.sizes['small-btn']
}));
const containerStyle = useStyled((theme) => ({
  fontSize: theme.fontSize.normal
}));

// Infer 2nd type argument for generic
const createSelectors = <TSource>() => {
  return <TSelector extends Record<string, (source: TSource) => any>>(
    selector: TSelector
  ) => selector;
};
type Source = {
  name: string;
  age: number;
  isAdmin: number;
};
const selectors = createSelectors<Source>()({
  getName: (source) => source.name,
  getAge: (source) => source.age,
  getIsAdmin: (source) => source.isAdmin
});

// Generally speaking, the lower we go, the better infer
const arrayOfLiterals = <T extends string>(arr: Array<T>) => arr;
const testArrOfLit = arrayOfLiterals([
  'Hi',
  'there',
  'my',
  'name',
  'is',
  'Nam'
]);

const createClassNamesFactory =
  <TClasses extends Record<string, string>>(classes: TClasses) =>
  (type: keyof TClasses, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(' ');
  };
const getBg = createClassNamesFactory({
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500'
});
const primaryBg = getBg('primary');
const primaryBgWithMargin = getBg('primary', 'mr-2');

// Full infer example
type InfiniteScrollParams<TRow> = {
  initialRows?: TRow[];
  key: keyof TRow;
  fetchRows: () => Promise<TRow[]> | TRow[];
};
const makeInfiniteScroll = <TRow>(params: InfiniteScrollParams<TRow>) => {
  const data = params.initialRows || [];

  const scroll = async () => {
    const rows = await params.fetchRows();
    data.push(...rows);
  };

  return {
    scroll,
    getRows: () => data
  };
};

const { getRows } = makeInfiniteScroll({
  key: 'id',
  initialRows: [
    {
      id: 1,
      name: 'John'
    }
  ],
  fetchRows: () => Promise.resolve([{ id: 2, name: 'Doe' }])
});
const rows = getRows();
