/**
 * Learning JavaScript ch21. 객체 프로퍼티 설정과 프락시
 */

import { describe, test, expect } from '@jest/globals';

describe('프로퍼티 테스트', () => {
  const USER_EMAIL = Symbol();

  class User {
    // USER_EMAIL을 평가한 값을 키 값으로 사용한다.
    [USER_EMAIL]: null | string;

    constructor() {
      this[USER_EMAIL] = null;
    }

    set email(value: string) {
      if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
      this[USER_EMAIL] = value;
    }

    get email() {
      if (!this[USER_EMAIL]) return '';
      return this[USER_EMAIL];
    }
  }

  test('접근자 프로퍼티로 클래스 값에 접근한다.', () => {
    const user = new User();
    user.email = 'john@doe.com'; // setter가 호출된다.
    expect(user.email).toBe('john@doe.com'); // getter가 호출된다.
  });

  test('읽기 전용 프로퍼티를 생성한다.', () => {
    // given
    class Rectangle {
      readonly width: number;
      readonly height: number;

      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
      }

      get perimeter() {
        return this.width * 2 + this.height * 2;
      }
    }

    // when
    const rectangle = new Rectangle(10, 20);

    // then
    expect(rectangle.perimeter).toBe(20 + 40);
  });

  test('객체 프로퍼티는 3가지 속성을 갖는다.', () => {
    // when
    const obj = { foo: 'bar' };
    const pd = Object.getOwnPropertyDescriptor(obj, 'foo');

    // then
    expect(pd).toHaveProperty('value');
    expect(pd).toHaveProperty('writable'); // 쓰기 가능한지
    expect(pd).toHaveProperty('enumerable'); // 나열 가능한지
    expect(pd).toHaveProperty('configurable'); // 설정 가능한지
  });

  test('불변 객체를 생성한다.', () => {
    // given
    const appInfo = {
      company: 'Whit Knight Software, Inc.',
      version: '1.3.5',
      buildId: '0995448',
      copyright() {
        return `(c) ${new Date().getFullYear()}, ${this.company}`;
      },
    };

    // when
    Object.freeze(appInfo);

    // then
    expect(Object.isFrozen(appInfo)).toBeTruthy();
    expect(() => (appInfo.company = 'can not modify')).toThrowError(TypeError);
  });
});
