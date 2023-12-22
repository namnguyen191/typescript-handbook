type BasedIngredients = {
  marianaSauce: string;
  crust: number;
  cheese: boolean;
  ham: string;
}

type ExtraIngredients = {
  glutenFree: boolean;
  mushroom: string;
  onion: string;
  olive: string;
  fish: string;
  sausage: string;
}

type MeatLoverPizza = Pick<BasedIngredients, 'crust' | 'marianaSauce' | 'cheese'> & Pick<ExtraIngredients, 'onion' | 'sausage'>;

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };

export type EasyToReadMeatLoverPizza = Resolve<MeatLoverPizza>;
