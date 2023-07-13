const someFunc = () => ({
  hi: 'my',
  name: 1,
  is: true,
  nam: [{ wut: 'is', going: 'on' }]
});

type TypeOfSomeFunc = typeof someFunc;
type TypeOfSomeFuncReturn = ReturnType<TypeOfSomeFunc>;
