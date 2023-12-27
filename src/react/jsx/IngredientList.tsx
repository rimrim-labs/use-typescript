import React from 'react';
import { Ingredients } from './IngredientTypes';
import Ingredient from './Ingredient';

type IngredientListProps = {
  ingredients: Ingredients[];
};

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="ingredients">
      {ingredients.map((ingredient, idx) => (
        <Ingredient key={idx} name={ingredient.name} amount={ingredient.amount} measurement={ingredient.measurement} />
      ))}
    </ul>
  );
}

export default IngredientList;
