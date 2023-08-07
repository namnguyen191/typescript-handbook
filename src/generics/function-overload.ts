// function overload
// Best for readibility. Use when there's different return type based on input
function returnWhatIsPassedInOverload(t: 1): 1;
function returnWhatIsPassedInOverload(t: 'Nam'): Nam;
function returnWhatIsPassedInOverload(t: unknown) {
  return t;
}
const resultFromOverload1 = returnWhatIsPassedInOverload(1);
const resultFromOverload2 = returnWhatIsPassedInOverload('Nam');

// Always explicit the function return type since overload won't be able to infer
function morningOrNight(input: 'morning'): 'night';
function morningOrNight(input: 'night'): 'morning';
function morningOrNight(input: 'morning' | 'night'): 'morning' | 'night' {
  return (input = 'morning' ? 'night' : 'morning');
}
const morning = morningOrNight('night');
const night = morningOrNight('morning');

// Combine with generic
function peaceInTheMiddleEast(input: 'yes'): 'no';
function peaceInTheMiddleEast<T>(input: T): T;
function peaceInTheMiddleEast(input: unknown): 'no' | unknown {
  if (input === 'yes') {
    return 'no';
  }

  return input;
}
const noPeace = peaceInTheMiddleEast('yes');
const wtfMan = peaceInTheMiddleEast({ yo: 'wtf ' });

// Solving Union infer problem using function overload
const someObj = {
  a: '1',
  b: 2,
  c: true
} as const;
// we want to default key to 'a' if not provided
// const getSomeObjByKey = <TKey extends keyof typeof someObj>(
//   key: TKey = 'a'
// ) => {
//   return someObj[key];
// };
function getSomeObjByKeyWithDefault(): (typeof someObj)['a'];
function getSomeObjByKeyWithDefault<TKey extends keyof typeof someObj>(
  key: TKey
): (typeof someObj)[TKey];
function getSomeObjByKeyWithDefault(key: keyof typeof someObj = 'a') {
  return someObj[key];
}
const someA = getSomeObjByKeyWithDefault('a');
const someB = getSomeObjByKeyWithDefault('b');
const someC = getSomeObjByKeyWithDefault('c');
const someDefault = getSomeObjByKeyWithDefault();

// Compose problem
function compose<T1, T2>(func: (t1: T1) => T2): (t1: T1) => T2;
function compose<T1, T2, T3>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3
): (t1: T1) => T3;
function compose<T1, T2, T3, T4>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t3: T3) => T4
): (t1: T1) => T4;
function compose<T1, T2, T3, T4, T5>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t3: T3) => T4,
  func4: (t4: T4) => T5
): (t1: T1) => T3;
function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => funcs.reduce((acc, cur) => cur(acc), input);
}

const addOne = (input: number) => input + 1;
const addTwoAndStingify = compose(addOne, addOne, String);
const resultCompose = addTwoAndStingify(1);
const stringToNumberAndDouble = (input: string) => parseInt(input) * 2;
const addTwoAndStingifyThenBackToNumberAndDouble = compose(
  addTwoAndStingify,
  stringToNumberAndDouble
);
const resultCompose2 = addTwoAndStingifyThenBackToNumberAndDouble(1);
