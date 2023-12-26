/**
 * Learning React ch04. 순수 리액트
 */

import React from 'react';

describe('React 엘리먼트 테스트.', () => {
  test('React 엘리먼트를 생성한다.', () => {
    const h1 = React.createElement('h1', { id: 'recipe-0', datatype: 'title' }, 'Baked Salmon');
    expect(h1.type).toEqual('h1');
    expect(h1.props.id).toEqual('recipe-0');
    expect(h1.props.datatype).toEqual('title');
  });

  test('React 엘리먼트 트리를 생성한다.', () => {
    const items = ['연어 500그램', '잣 1컵', '버터 상추 2컵'];
    React.createElement(
      'ul',
      { className: 'ingredients' },
      items.map((item, idx) => React.createElement('li', { key: idx }, item)),
    );
  });
});

describe('React 컴포넌트 테스트', () => {
  test('재사용 가능한 컴포넌트를 생성한다.', () => {
    type PropType = {
      items: string[];
    };
    const ingredientsList = ({ items }: PropType) => {
      React.createElement(
        'ul',
        { className: 'ingredients' },
        items.map((ingredient, idx) => React.createElement('li', { key: idx }, ingredient)),
      );
    };

    ingredientsList({ items: ['baked salmon', 'pepper'] });
  });
});
