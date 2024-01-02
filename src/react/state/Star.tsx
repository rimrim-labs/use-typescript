import React from 'react';
import './common/Star.css';

interface StarProps {
  selected: boolean;
  onClick: (f: any) => any;
}

/**
 * 상태가 없는 함수형 컴포넌트.
 */
function Star({ selected = false, onClick = (f) => f }: StarProps) {
  return <div className={selected ? 'start selected' : 'selected'} onClick={onClick}></div>;
}

export default Star;
