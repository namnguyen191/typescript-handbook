const SomeData = {
  name: 'Nam Nguyen',
  age: 17,
  body: {
    height: 1.82
  },
  isAdmin: true,
  id: 'ID'
};

type SomeDataType = typeof SomeData;

type Name = SomeDataType['name'];
type Age = SomeDataType['age'];
type Height = SomeDataType['body']['height'];
type IsAdmin = SomeDataType['isAdmin'];
type Id = SomeDataType['id'];
