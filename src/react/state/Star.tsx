import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarProps {
  selected: boolean;
  onClick: (f: any) => any;
}

/**
 * 상태가 없는 함수형 컴포넌트.
 */
function Star({ selected = false, onClick = (f) => f }: StarProps) {
  return <FaStar color={selected ? 'red' : 'grey'} onClick={onClick} />;
}

export default Star;
