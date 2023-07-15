// Union: type A or type B or type C
type Union = 'a' | 'b' | 'c';

// Discriminated Union: type A, B and C has common keys
type DiscriminatedUnion =
  | { type: 'a'; keya: 'this is a' }
  | { type: 'b'; keyb: 'this is b' }
  | { type: 'c'; keyc: 'this is c' };

const testDiscriminatedUnion = (o: DiscriminatedUnion) => {
  if (o.type === 'a') {
    console.log(o.keya);
  }

  if (o.type === 'b') {
    console.log(o.keyb);
  }

  if (o.type === 'c') {
    console.log(o.keyc);
  }
};

//  Enums
