/**
 * Learning JavaScript ch06. 함수
 */

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
