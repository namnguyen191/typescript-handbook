import { S } from 'ts-toolbelt';

type Route = '/' | '/home' | '/about' | '/faq';
type RouteObjects = {
  [R in Route]?: R;
};

type Attributes = {
  firstName: string;
  lastName: string;
  age: number;
  isAdmin: boolean;
};
type AttributesGetters = {
  [A in keyof Attributes]: () => Attributes[A];
};
type AttributeGetterFuncs = {
  [A in keyof Attributes as `get${Capitalize<A>}`]: () => Attributes[A];
};

type UserObj = {
  id: string;
  name: string;
  age: number;
  groupId: string;
  managerId: string;
  isAdmin: boolean;
  depId: string;
};
type SearchForId = `${string}${'id' | 'Id' | 'ID'}${string}`;
type ObjIds<T> = {
  [K in keyof T as K extends SearchForId ? K : never]: T[K];
};
type UserObjIds = ObjIds<UserObj>;

// Discriminated Union manipulation
type RouteConfig =
  | { route: '/inventoy'; search: { pageNum: number; pageLen: number } }
  | { route: '/home'; search: {} }
  | { route: '/about'; search: {} };
type RouteObjs = {
  [R in RouteConfig['route']]: Extract<RouteConfig, { route: R }>['search'];
};
type RouteObjsV2 = {
  [R in RouteConfig as R['route']]: R['search'];
};

type Values = {
  email: string;
  password: string;
  isAdmin: boolean;
};
type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];

type FruitMap = {
  apple: 'red';
  banana: 'yellow';
  kiwi: 'green';
};
type TransformedFruitMap = {
  [K in keyof FruitMap]: `${K}:${FruitMap[K]}`;
}[keyof FruitMap];

type FruitUnion =
  | { name: 'apple'; color: 'red' }
  | { name: 'banana'; color: 'yellow' }
  | { name: 'kiwi'; color: 'green' };
type TransformedFruitUnion = {
  [K in FruitUnion as K['name']]: `${K['name']}:${K['color']}`;
}[FruitUnion['name']];

type UserPath = '/users/:id';
type UserOrgPath = '/users/:id/org/:orgId';
type ExtractParams<TPath extends string> = {
  [K in S.Split<TPath, '/'>[number] as K extends `:${infer P}`
    ? P
    : never]: string;
};
type UserParams = ExtractParams<UserPath>;
type UserOrgParams = ExtractParams<UserOrgPath>;

type UserAttributes = {
  name: string;
  email: string;
  password: string;
};
type ExtractToObject<Obj extends Record<string, unknown>> = {
  [K in keyof Obj]: Record<K, Obj[K]>;
}[keyof Obj];
type UserAttributesAsObjects = ExtractToObject<UserAttributes>;

type RouteV2 =
  | { route: '/'; search: { pageNum: number; pageLen: number } }
  | { route: '/checkout' }
  | { route: '/about' };
type RouteV2ToSearchObj = {
  [R in RouteV2 as R['route']]: R extends {
    search: infer S;
  }
    ? S
    : never;
};

type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : { [K in keyof T]?: DeepPartial<T[K]> };
type TestType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: boolean;
        i: 'hi';
      }[];
    };
  };
};
type DeepPartialTestType = DeepPartial<TestType>;

class TableWidget {
  columnsWidgetOption: string[] = [];
  rowsWidgetOption: string[] = [];
  colorsWidgetOption: 'light' | 'dark' = 'dark';
  count: number = 0;
}

type WidgetOptions<TWidget> = {
  [Key in keyof TWidget as Key extends `${string}WidgetOption`
    ? Key
    : never]: TWidget[Key];
};

type TableWidgetOptions = WidgetOptions<TableWidget>;
