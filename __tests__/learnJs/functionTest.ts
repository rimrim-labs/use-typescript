/**
 * Learning JavaScript ch06. 함수
 */

import { matchesPattern } from '@babel/types';
import { describe } from '@jest/globals';

describe('this 테스트', () => {
  test('this는 호출된 함수를 소유한 객체를 가리킨다.', () => {
    // given
    const obj = {
      speak() {
        return `My name is ${this}`;
      },
      toString() {
        return 'obj';
      },
    };

    // when & then
    expect(obj.speak()).toStrictEqual('My name is obj');
  });

  test('함수를 호출한 객체를 알 수 없으면 undefined를 할당받는다.', () => {
    // given
    const obj = {
      speak() {
        return `My name is ${this}`;
      },
      toString() {
        return 'obj';
      },
    };

    const speak = obj.speak;

    // when & then
    expect(speak()).toEqual('My name is undefined');
  });
});

describe('화살표 함수 테스트', () => {
  test('화살표 표기법으로 함수를 선언할 수 있다.', () => {
    // when
    const f = () => 'arrow function';

    // then
    expect(f()).toStrictEqual('arrow function');
  });

  test('화살표 함수를 사용하면 this는 상위 컨텍스트의 this를 정적으로 상속받는다.', () => {
    // given
    const obj = {
      name: 'hello',
      speak: function () {
        const printName = () => this.name;
        return printName() + ' js';
      },
    };

    // when & then
    expect(obj.speak()).toStrictEqual('hello js');
  });
});

/**
 * Learning JavaScript ch13. 함수와 추상적 사고
 */

describe('함수 테스트', () => {
  test('부수효과가 없는 순수한 함수를 생성한다.', () => {
    // given
    function getRainbowIter() {
      const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      let colorIndex = -1;

      return {
        next() {
          if (++colorIndex >= colors.length) colorIndex = 0;
          return { value: colors[colorIndex], done: false };
        },
      };
    }

    // when & then
    const iter = getRainbowIter();
    expect(iter.next()).toStrictEqual({ value: 'red', done: false });
    expect(iter.next()).toStrictEqual({ value: 'orange', done: false });
    expect(iter.next()).toStrictEqual({ value: 'yellow', done: false });
  });

  test('함수 매개변수로 함수를 전달한다.', () => {
    // given
    function sum(arr: number[], f: (num: number) => number) {
      return arr.reduce((prev, cur) => (prev += f(cur)), 0);
    }

    // when & then
    expect(sum([1, 2, 3], (x) => x * x)).toBe(1 + 4 + 9);
    expect(sum([1, 2, 3], (x) => Math.pow(x, 3))).toBe(1 + 8 + 27);
  });

  test('함수 반환 타입으로 함수를 반환한다.', () => {
    // given
    function sum(arr: number[], f: (num: number) => number) {
      return arr.reduce((prev, cur) => (prev += f(cur)), 0);
    }

    function newSummer(f: (num: number) => number) {
      return (arr: number[]) => sum(arr, f);
    }

    // when
    const sumOfSqures = newSummer((x) => x * x);

    // then
    expect(sumOfSqures([1, 2, 3])).toBe(1 + 4 + 9);
  });
});
