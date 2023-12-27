import { Ingredients, Recipes } from '../IngredientTypes';

const data: Recipes[] = [
  new Recipes(
    'Baked Salmon',
    [new Ingredients('연어', 500, '그램'), new Ingredients('잣', 1, '개'), new Ingredients('버터 상추', 2, '컵')],
    ['오븐을 350도로 예열한다.', '연어, 마늘, 잣을 그릇데 담고 오븐에서 익힌다.', '맛있게 먹는다!'],
  ),
  new Recipes(
    '생선 타코',
    [
      new Ingredients('흰살생선', 500, '그램'),
      new Ingredients('치즈', 1, '컵'),
      new Ingredients('아이스버그 상추', 2, '컵'),
    ],
    ['생성을 그릴에 익힌다.', '또띠아 3장 위에 생선을 얹는다', '맛있게 먹는다!'],
  ),
];

export default data;
