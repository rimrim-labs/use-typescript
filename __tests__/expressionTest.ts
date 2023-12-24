/**
 * Learning JavaScript ch05. 표현식과 연산자
 */

import { describe, test, expect } from '@jest/globals';

describe('비교 연산자 테스트', () => {
  test('=== 연산자는 같은 객체를 가리키거나 같은 타입과 값을 가져야 한다.', () => {
    // given
    const obj1 = { hi: 1 };
    const obj2 = { hi: 1 };

    const num1 = 5;
    const num2 = 5;

    // when & then
    expect(obj1 === obj1).toBeTruthy();
    expect(obj1 === obj2).toBeFalsy();
    expect(num1 === num2).toBeTruthy();
  });

  test('== 연산자는 같은 값을 갖도록 변환할 수 있어야 한다.', () => {
    // given
    const num = 5;
    const strNum = '5';

    // when & then
    expect(num).not.toEqual(strNum);
  });

  test('자바스크립트의 모든 숫자는 더블 형식이므로 범위 값을 비교해야 한다.', () => {
    // given
    let n = 0;
    const goal = 0.3;

    // when
    // eslint-disable-next-line no-constant-condition
    while (true) {
      n += 0.1;
      if (Math.abs(n - goal) < Number.EPSILON) break;
    }

    // then
    expect(n).toBeCloseTo(goal);
  });
});

describe('문자열 병합 테스트', () => {
  test('피연산자 중 하나라도 문자열이면 문자열 병합을 수행한다.', () => {
    // given
    const opr1 = 3;
    const opr2 = '3';

    // when & then
    expect(opr1 + opr2).toStrictEqual('33');
  });
});

describe('논리 연산자 테스트', () => {
  test('거짓 같은 값들이 존재한다.', () => {
    expect(undefined).toBeFalsy();
    expect(null).toBeFalsy();
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect(NaN).toBeFalsy();
    expect('').toBeFalsy();
  });

  test('빈 배열과 객체는 참 같은 값이다.', () => {
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
  });

  test('단축 평가 시 값을 결정한 피연산자를 반환한다.', () => {
    expect(undefined || {}).toStrictEqual({});
    expect(undefined && {}).toBeUndefined();
  });
});

describe('해체 할당 테스트', () => {
  test('객체 변수를 해체한다.', () => {
    // given
    const obj = { a: 1, b: 2 };

    // when
    const { a, b } = obj;

    // then
    expect(a).toStrictEqual(1);
    expect(b).toStrictEqual(2);
  });

  test('배열 변수를 해체한다.', () => {
    // given
    const arr = [1, 'hi'];

    // when
    const [a, b, c] = arr;

    // then
    expect(a).toStrictEqual(1);
    expect(b).toStrictEqual('hi');
    expect(c).toBeUndefined();
  });
});
