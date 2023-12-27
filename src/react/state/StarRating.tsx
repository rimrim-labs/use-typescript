import React from 'react';
import Star from './Star';

interface Props {
  starSelected: number;
  totalStars: number;
  onRate: (f: number) => any;
}

/**
 * 상태가 없는 함수형 컴포넌트.
 */
function StarRating({ starSelected = 0, totalStars = 5, onRate = (f) => f }: Props) {
  return (
    <div className="star-rating">
      {Array(totalStars)
        .fill(null)
        .map((_, idx) => (
          <Star key={idx} selected={idx < starSelected} onClick={() => onRate(idx + 1)} />
        ))}
      <p>
        별점: {starSelected} / {totalStars}
      </p>
    </div>
  );
}

export default StarRating;
