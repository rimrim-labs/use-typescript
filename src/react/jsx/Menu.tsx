import React from 'react';
import { Recipes } from './IngredientTypes';
import Recipe from './Recipe';

type MenuProps = {
  recipes: Recipes[];
  title: string;
};

function Menu({ recipes, title }: MenuProps) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="recipes">
        {recipes.map((recipe, idx) => (
          <Recipe key={idx} name={recipe.name} ingredients={recipe.ingredients} steps={recipe.steps} />
        ))}
      </div>
    </article>
  );
}

export default Menu;
