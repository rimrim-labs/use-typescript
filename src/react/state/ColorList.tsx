import React from 'react';
import Color from './Color';
import ColorType from './common/types';

interface Props {
  colors: ColorType[];
  totalStars: number;
  onRate: (id: string, rating: number) => any;
}

function ColorList({ colors = [], totalStars, onRate = (f) => f }: Props) {
  return (
    <div className="color-list">
      {colors.length === 0 ? (
        <p>색이 없습니다. (색을 추가해주세요)</p>
      ) : (
        colors.map((color) => (
          <Color
            onRate={(rating) => onRate(color.id, rating)}
            totalStars={totalStars}
            title={color.title}
            color={color.color}
            rating={color.rating}
          />
        ))
      )}
    </div>
  );
}

export default ColorList;
