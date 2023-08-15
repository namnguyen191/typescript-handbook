class Test1 {
  name = 'Test1';

  constructor() {
    this.callName();
  }

  callName() {
    console.log(this.name);
  }
}

class Test2 {
  name = 'Test2';

  constructor() {
    const test1 = new Test1();
    test1.callName();
  }
}
