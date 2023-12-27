export class Ingredients {
  name: string;

  amount: number;

  measurement: string;

  constructor(name: string, amount: number, measurements: string) {
    this.name = name;
    this.amount = amount;
    this.measurement = measurements;
  }
}

export class Recipes {
  name: string;

  ingredients: Ingredients[];

  steps: string[];

  constructor(name: string, ingredients: Ingredients[], steps: string[]) {
    this.name = name;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
