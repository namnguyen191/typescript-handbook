type Human = {
  firstName: string;
  lastName: string;
};

type Animal = {
  name: string;
};

type AnimalOrHuman<T extends Human | Animal> = T extends Human
  ? { humanName: string }
  : { animalName: string };

const getDisplayName = <T extends Human | Animal>(
  item: T
): AnimalOrHuman<T> => {
  if ('name' in item) {
    return {
      animalName: item.name
    } as AnimalOrHuman<T>;
  } else {
    return {
      humanName: item.firstName + ' ' + item.lastName
    } as AnimalOrHuman<T>;
  }
};

const human = getDisplayName({ firstName: 'Nam', lastName: 'Nguyen' });
console.log(human);

const animal = getDisplayName({ name: 'Ti To' });
console.log(animal);
