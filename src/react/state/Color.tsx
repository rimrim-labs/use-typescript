import React from 'react';
import StarRating from './StarRating';

interface Props {
  title: string;
  color: string;
  rating: number;
  totalStars: number;
  onRate: (f: number) => any;
}

const Color = ({ title, color, rating = 0, totalStars, onRate = (f) => f }: Props) => (
  <section className="color">
    <h1>{title}</h1>
    <div className="color" style={{ backgroundColor: color }}></div>
    <div>
      <StarRating starSelected={rating} onRate={onRate} totalStars={totalStars} />
    </div>
  </section>
);

export default Color;
