/**
 * Learning JavaScript ch08. 배열과 배열 처리
 */

import { describe, test, expect } from '@jest/globals';

describe('배열 요소 조작 메서드 테스트', () => {
  test('배열에 요소를 추가한다.', () => {
    // given
    const arr = [1, 2, 3];

    // when
    arr.unshift(0);
    arr.push(4);

    // then
    expect(arr).toStrictEqual([0, 1, 2, 3, 4]);
  });

  test('배열 요소를 제거한다.', () => {
    // given
    const arr = [1, 2, 3];

    // when
    arr.shift();
    arr.pop();

    // then
    expect(arr).toStrictEqual([2]);
  });

  test('배열 끝에 여러 요소를 추가한 사본을 반환한다.', () => {
    // given
    const arr = [1, 2, 3];

    // when
    const copy = arr.concat([4, 5, 6]);

    // then
    expect(copy).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  test('배열 요소 일부를 가져온다.', () => {
    // given
    const arr = [1, 2, 3];

    // when
    const copy1 = arr.slice(1, 2);
    const copy2 = arr.slice(1);
    const copy3 = arr.slice(-2, 1);

    // then
    expect(copy1).toStrictEqual([2]);
    expect(copy2).toStrictEqual([2, 3]);
    expect(copy3).toStrictEqual([]);
  });

  test('특정 값으로 배열을 채운다.', () => {
    // given
    const arr = [1, 2, 3];

    // when
    arr.fill(1);

    // then
    expect(arr).toStrictEqual([1, 1, 1]);
  });
});

describe('배열 정렬 테스트', () => {
  test('배열을 오름차순으로 정렬한다.', () => {
    // given
    const arr = [3, 1, 2];

    // when
    arr.sort();

    // then
    expect(arr).toStrictEqual([1, 2, 3]);
  });

  test('배열을 역순으로 정렬한다.', () => {
    // given
    const arr = [3, 1, 2];

    // when
    arr.sort();
    arr.reverse();

    // then
    expect(arr).toStrictEqual([3, 2, 1]);
  });

  test('객체 배열을 정렬한다.', () => {
    // given
    const objs = [
      { age: 5, name: 'a' },
      { age: 3, name: 'c' },
      { age: 1, name: 'd' },
    ];

    // when
    objs.sort((a, b) => {
      if (a.age == b.age) return 0;
      return a.age > b.age ? 1 : -1;
    });

    // then

    expect(objs).toStrictEqual([
      { age: 1, name: 'd' },
      { age: 3, name: 'c' },
      { age: 5, name: 'a' },
    ]);
  });
});

describe('배열 검색 테스트', () => {
  test('첫번째로 일치하는 요소의 인덱스를 반환한다', () => {
    // given
    const obj = { name: 'jerry' };
    const arr = [1, 4, 'a', obj];

    // when & then
    expect(arr.indexOf({ name: 'jerry' })).toStrictEqual(-1);
    expect(arr.indexOf(obj)).toStrictEqual(3);
    expect(arr.indexOf('a')).toStrictEqual(2);
  });

  test('조건과 일치하는 요소를 검색한다.', () => {
    // given
    const obj = { name: 'jerry' };
    const arr = [obj];

    // when & then
    expect(arr.findIndex((o) => o.name === 'jerry')).toStrictEqual(0);
    expect(arr.find((o) => o.name === 'jerry')).toStrictEqual(obj);
  });
});

describe('map, filer, reduce 테스트', () => {
  test('map은 요소를 변형한다.', () => {
    // given
    const carts = [
      { name: 'widget', price: 9.95 },
      { name: 'gadget', price: 22.95 },
    ];

    // when
    const names = carts.map((x) => x.name);
    const prices = carts.map((x) => x.price);

    // then
    expect(names).toStrictEqual(['widget', 'gadget']);
    expect(prices).toStrictEqual([9.95, 22.95]);
  });

  test('filter는 요소를 필터링한다.', () => {
    // given
    const carts = [
      { name: 'widget', price: 9.95 },
      { name: 'gadget', price: 22.95 },
    ];

    // when
    const names = carts.filter((x) => x.name === 'gadget');
    const prices = carts.filter((x) => x.price > 22);

    // then
    expect(names).toStrictEqual([{ name: 'gadget', price: 22.95 }]);
    expect(prices).toStrictEqual([{ name: 'gadget', price: 22.95 }]);
  });

  test('reduce는 배열을 하나의 값으로 줄인다.', () => {
    // given
    const arr = [5, 7, 2, 4];

    // when
    const sum = arr.reduce((prev, cur) => (prev += cur), 0);

    // then
    expect(sum).toStrictEqual(5 + 7 + 2 + 4);
  });
});
