import { S } from 'ts-toolbelt';

type Route = `/${string}`;

const goToRoutes = (route: Route) => {};

goToRoutes('/home');

// goToRoutes('wrong');

type UserRoutes = '/users' | '/users/:id' | '/user/admin' | '/users/:email';
type DynamicUserRoutes = Extract<UserRoutes, `${string}:${string}`>;

type Guess = 'Nam' | 'John' | 'Jose';
type Dishes = 'Spaghetty' | 'Tuna Casserole' | 'Chow Mei';
type Orders = `${Dishes} for ${Guess}`;

type Path =
  '/Users/namnguyen/Desktop/projects/advanced-ts/src/types-convertion/template-literal.ts';
type PathTokens = S.Split<Path, '/'>;
