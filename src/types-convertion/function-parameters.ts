const someFunc1 = (
  some: 'weird',
  args: { really: 'weird' },
  right: string[]
) => {};

type TypeOfSomeFuncParameters = Parameters<typeof someFunc1>;
type TypeOfSomeFuncSecondArg = TypeOfSomeFuncParameters[1];
