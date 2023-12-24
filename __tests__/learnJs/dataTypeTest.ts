/**
 * Learning JavaScript ch03. 리터럴과 변수, 상수, 데이터 타입
 */

import { describe, expect, test } from '@jest/globals';

describe('문자열 리터럴 테스트', () => {
  test('문자열을 숫자로 바꾼다.', () => {
    expect(3 + '30').toBe('330');
  });
});

describe('심볼 테스트', () => {
  test('심볼은 유일하다.', () => {
    // when
    const RED = Symbol('The color of a sunset');
    const ORANGE = Symbol('The color of a sunet');

    // when & then
    expect(RED).not.toEqual(ORANGE);
  });
});

describe('객체 테스트', () => {
  test('객체는 프로퍼티를 갖는다.', () => {
    // when
    const obj = { color: 'yellow', 'not an identifier': 'value' };

    // then
    expect(obj.color).toStrictEqual('yellow');
    expect(obj['not an identifier']).toStrictEqual('value');
  });

  test('객체 프로퍼티의 키는 문자열과 심볼 타입만 가능하다.', () => {
    // given
    const KEY: unique symbol = Symbol('property key');

    // when
    const obj = { [KEY]: 'value' };

    // when & then
    expect(obj[KEY]).toEqual('value');
  });
});

describe('배열 테스트', () => {
  test('배열은 동적 크기를 갖는다.', () => {
    // given
    const arr: string[] = [];

    // when
    arr[0] = 'hi';
    arr[1] = 'hello';

    // then
    expect(arr).toHaveLength(2);
    expect(arr[0]).toEqual('hi');
    expect(arr[1]).toEqual('hello');
  });

  test('배열 크기를 초과한 인덱스에 값을 할당하면 배열 크기가 증가한다.', () => {
    // given
    const arr: string[] = ['hi', 'hello'];

    // when
    arr[3] = 'good';

    // then
    expect(arr[2]).toBeUndefined();
    expect(arr[3]).toEqual('good');
  });
});

describe('루프 테스트', () => {
  test('for..in 루프는 객체 프로퍼티를 순회한다.', () => {
    // given
    type ObjType = {
      hi: number;
      hello: number;
    };

    const obj: ObjType = { hi: 1, hello: 2 };
    let count: number = 0;

    // when
    let key: keyof ObjType;
    for (key in obj) {
      count += obj[key];
    }

    // then
    expect(count).toStrictEqual(3);
  });

  test('for..of 루프는 컬렉션 요소를 순회한다.', () => {
    // given
    const arr: string[] = ['hi', 'hello'];
    let count: number = 0;

    // when
    for (const elem of arr) {
      count += elem.length;
    }

    // then
    expect(count).toStrictEqual('hi'.length + 'hello'.length);
  });
});
