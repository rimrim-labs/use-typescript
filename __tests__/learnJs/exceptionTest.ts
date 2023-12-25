/**
 * Learning JavaScript ch11. 예외와 에러 처리
 */

import { describe, test, expect } from '@jest/globals';

describe('Error 테스트', () => {
  test('메시지와 함께 Error를 생성할 수 있다.', () => {
    // when
    const error = new Error('this is error message');

    // then
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('this is error message');
  });

  test('throw 키워드로 예외를 발생시킨다.', () => {
    // when
    const errorF = function () {
      throw new Error('this is error message');
    };

    // then
    expect(() => errorF()).toThrowError(Error);
  });
});
