import React from 'react';
import StarRating from './StarRating';

interface Props {
  title: string;
  color: string;
  rating: number;
  totalStars: number;
  onRate: (f: number) => any;
}

function Color({ title, color, rating = 0, totalStars, onRate = (f) => f }: Props) {
  return (
    <section className="color">
      <h1>{title}</h1>
      <div className="color" style={{ height: 50, backgroundColor: color }} />
      <div>
        <StarRating starSelected={rating} onRate={onRate} totalStars={totalStars} />
      </div>
    </section>
  );
}

export default Color;
