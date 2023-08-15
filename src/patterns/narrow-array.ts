type Fruit = {
  name: string;
  description: string;
};

const wrapFruits = <const TFruit extends Fruit>(fruits: TFruit[]) => {
  const getFruit = <TName extends TFruit['name']>(name: TName) => {
    return fruits.find((fruit) => fruit.name === name) as Extract<
      TFruit,
      { name: TName }
    >;
  };

  return {
    getFruit
  };
};

const fruits = wrapFruits([
  {
    name: 'banana',
    description: 'loved by monkeys'
  },
  {
    name: 'apple',
    description: 'hated by doctors'
  }
]);

const banana = fruits.getFruit('banana');
const apple = fruits.getFruit('apple');
// const cherry = fruits.getFruit('cherry');
