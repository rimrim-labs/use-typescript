import React from 'react';
import { Ingredients } from './IngredientTypes';
import Instruction from './Instruction';
import IngredientList from './IngredientList';

type RecipeProps = {
  name: string;
  ingredients: Ingredients[];
  steps: string[];
};

function Recipe({ name, ingredients, steps }: RecipeProps) {
  return (
    <section id={name.toLowerCase().replace(/ /g, '-')}>
      <h1>{name}</h1>
      <IngredientList ingredients={ingredients} />
      <Instruction title="조리 절차" steps={steps} />
    </section>
  );
}

export default Recipe;
