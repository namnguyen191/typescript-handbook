type ReturnWhatIsPassedIn<T> = T;
type ReturnAString = ReturnWhatIsPassedIn<string>;

type Maybe<T> = T | null | undefined;
type WillIStartSaving = Maybe<true>;

type AddRouteToPrefix<Route extends string> = `/${Route}`;
type HomeRoute = AddRouteToPrefix<'home'>;

type CreatePayloadType<TData, TErr extends string> = {
  data: TData;
  error: TErr;
};
type GetUserPayload = CreatePayloadType<string[], 'something went wrong'>;

type CreatePayloadTypeWithOptionalError<
  TData,
  TErr extends string | undefined = undefined
> = {
  data: TData;
  error: TErr;
};
type GetItemPayload = CreatePayloadTypeWithOptionalError<{ name: string }>;

type GetParametersAndReturnType<T extends (...args: any) => any> = {
  parameters: Parameters<T>;
  returnType: ReturnType<T>;
};
const thisFunc = (name: string, age: number) =>
  `My name is ${name}. And I am ${age} years old` as const;
type WhatIsThisFunc = GetParametersAndReturnType<typeof thisFunc>;

// An empty object represent ANYTHING that is not null or undefined
type SafeMaybe<T extends {}> = T | null | undefined;
type MaybeString = SafeMaybe<string>;
type MaybeBool = SafeMaybe<boolean>;
type MaybeTen = SafeMaybe<10>;
// type MaybeUndefined = SafeMaybe<undefined>;

type NonEmptyArrayOfType<T> = [T, ...Array<T>];
const makeEnum = (values: NonEmptyArrayOfType<string>) => values;
makeEnum(['a']);
makeEnum(['dsa', 'dsads', 'dsads']);
// makeEnum([]);

type MarcoOrPolo<T extends 'marco' | 'polo'> = T extends 'marco' ? 'polo' : T;
type Polo = MarcoOrPolo<'marco'>;
type Marco = MarcoOrPolo<'polo'>;
// type Wrong = MarcoOrPolo<'wrong'>;

type MenOrWomen<T extends 'men' | 'women' | string> = T extends 'men'
  ? 'women'
  : T extends 'women'
  ? 'men'
  : never;
type Men = MenOrWomen<'women'>;
type Women = MenOrWomen<'men'>;
type Never = MenOrWomen<'I identify as a tree'>;

type GetData<T> = T extends { data: infer TData } ? TData : never;
type Data1 = GetData<{ data: 'Nam' }>;
type Data2 = GetData<{ data: { name: 'Nam'; age: '22' } }>;
type Data3 = GetData<{ dota: 'this is wrong?' }>;

type Coors<Event, Context, Name, Point> = {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
};
type GetPoint<T> = T extends Coors<any, any, any, infer TPoint>
  ? TPoint
  : never;
type ExampleCoors = Coors<'click', 'browser', 'button', { x: 12; y: 56 }>;
type ExampleCoorsPoint = GetPoint<ExampleCoors>;

type Names = [
  'Nam Nguyen',
  'John Doe',
  'Marry Jane',
  'Burger King',
  'MacDonald'
];
type GetSurName<T> = T extends `${string} ${infer Last}` ? Last : never;
type Nam = GetSurName<Names[0]>;
type John = GetSurName<Names[0]>;
type NoSurName = GetSurName<Names[4]>;

const getProps = async () => {
  const props = await Promise.resolve({
    props: {
      data: 123,
      createdBy: 'Nam Nguyen'
    }
  });

  return props;
};
type InferPropsFromFunc<T> = T extends () => Promise<{ props: infer TProps }>
  ? TProps
  : never;
type PropsFromGetProps = InferPropsFromFunc<typeof getProps>;

const parser1 = {
  parse: () => 1
};
const parser2 = () => 'Hello';
const parser3 = {
  extract: () => true
};
type ParserResult<T> = T extends
  | { parse: () => infer TResult }
  | (() => infer TResult)
  | { extract: () => infer TResult }
  ? TResult
  : never;
type Parser1Result = ParserResult<typeof parser1>;
type Parser2Result = ParserResult<typeof parser2>;
type Parser3Result = ParserResult<typeof parser3>;

// distributed conditional => only generic context works
type Fruit = 'apple' | 'banana' | 'strawberry';
type IsAppleOrBanna = Fruit extends infer T
  ? T extends 'apple' | 'banana'
    ? T
    : never
  : never;
