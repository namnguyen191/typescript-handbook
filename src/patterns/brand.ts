declare const brand: unique symbol;

// Force to brand an object with "as BrandName"
export type Brand<T, TBrand> = T & { [brand]: TBrand };

type Password = Brand<string, 'Password'>;
const verifyPassword = (password: Password) => password;
verifyPassword('1234' as Password);

type PersonalInfo = Brand<
  {
    name: string;
    age: number;
    address: string;
  },
  'PersonalInfo'
>;
let myInfos: PersonalInfo;
myInfos = {
  name: 'Nam',
  age: 25,
  address: '70 dsads'
} as PersonalInfo;

type Email = Brand<string, 'Email'>;
const validateUserInfo = (values: {
  email: string;
  password: string;
}): { email: Email; password: Password } => {
  const { email, password } = values;
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }

  if (password.length < 8) {
    throw new Error('Invalid password');
  }

  return {
    email: email as Email,
    password: password as Password
  };
};
const validatedUserInfo = validateUserInfo({
  email: 'nam@ibm.com',
  password: 'fajfjla31'
});

// Now we know for sure that these are valid email and password and not just some string
const createUser = (values: { email: Email; password: Password }) => {};
createUser(validatedUserInfo);
// will not work on invalidated value
// createUser({ email: 'someweirdemail', password: '1' });

type User = {
  id: string;
  name: string;
  dob: string;
};
type UserId = Brand<string, 'UserId'>;
type Book = {
  id: string;
  author: string;
};
type BookId = Brand<string, 'BookId'>;
type DB = {
  [userId: UserId]: User;
  [bookId: BookId]: Book;
};
const db: DB = {};
const user = db['user1' as UserId];
const book = db['book1' as BookId];
