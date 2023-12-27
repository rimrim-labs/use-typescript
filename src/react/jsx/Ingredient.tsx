import React from 'react';

type IngredientProps = {
  amount: number;
  measurement: string;
  name: string;
};

function Ingredient({ amount, measurement, name }: IngredientProps) {
  return (
    <li>
      <span className="amount">{amount}</span>
      <span className="measurement">{measurement}</span>
      <span className="name">{name}</span>
    </li>
  );
}

export default Ingredient;
