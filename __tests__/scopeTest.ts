/* eslint-disable no-var */

/**
 * Learning JavaScript ch07. 스코프
 */

import { describe, test, expect } from '@jest/globals';

describe('정적 스코프 테스트', () => {
  test('함수가 정의될 때 존재한 변수에만 접근할 수 있다.', () => {
    // given
    const x = 3;

    function f() {
      return x;
    }

    // when & then
    expect(f()).toStrictEqual(3);
  });

  test('전역 스코프에 존재하는 변수는 모든 스코프에서 접근할 수 있다.', () => {
    // given
    const x = 3;
    const y = 5;

    function f() {
      return x + y;
    }

    // when & then
    expect(f()).toStrictEqual(8);
  });

  test('let과 const로 변수를 블록 스코프에 선언할 수 있다.', () => {
    {
      const x = 3;
      expect(x).toStrictEqual(3);
    } // x는 블록을 나가는 즉시 사라진다.

    const x = 4;
    expect(x).toStrictEqual(4);
  });

  test('내부 블록의 변수는 외부 블록의 변수를 가린다', () => {
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x = 5;
      const y = 7;
      {
        const x = 7;

        expect(x).toStrictEqual(7);
        expect(y).toStrictEqual(7);
      }
    }
  });
});

describe('클로저 테스트트', () => {
  test('스코프를 함수 주변으로 좁힌다.', () => {
    // given
    let globalFunc;

    // 블록을 벗어나도 스코프가 메모리에 계속 유지된다.
    {
      const blockVar = 'a';
      globalFunc = function () {
        return blockVar;
      };
    }

    // when & then
    expect(globalFunc()).toStrictEqual('a');
  });

  test('블록이 종료되어도 블록 변수에 접근할 수 있게 된다.', () => {
    // given
    let globalFunc;

    {
      const obj = { note: 'Safe' };
      globalFunc = function () {
        return obj;
      };
    }

    // when
    const obj = globalFunc();
    obj.note = 'Unsafe';

    // then
    expect(obj.note).toStrictEqual('Unsafe');
  });
});

describe('IIFE 테스트', () => {
  test('익명 함수를 선언하고 즉시 실행한다.', () => {
    // when
    const res = (function () {
      let count = 0;
      return function () {
        return `${++count} times called`;
      };
    })();

    // then
    expect(res()).toStrictEqual('1 times called');
    expect(res()).toStrictEqual('2 times called');
  });
});

describe('함수 스코프 테스트', () => {
  test('전역 스코프에 선언된 var는 함수 스코프를 갖는다.', () => {
    // 선언하기 전에 접근할 수 있다.
    expect(var1).toBeUndefined();

    var var1;
  });

  test('var 변수 선언만 호이스팅 된다.', () => {
    expect(var1).toBeUndefined();

    var var1;
    var1 = 3;
  });

  test('var는 같은 변수를 여러 번 정의해도 무시한다.', () => {
    // given
    var x = 3;

    // when
    if (x === 3) {
      var x = 5;
    }

    // then
    expect(x).toStrictEqual(5);
  });

  test('함수 선언도 호이스팅된다.', () => {
    expect(f()).toStrictEqual(5);

    function f() {
      return 5;
    }
  });

  test('변수에 할당된 함수는 호이스팅되지 않는다.', () => {
    // expect(f()).toStrictEqual(5);

    // when
    const f = function () {
      return 5;
    };

    // then
    expect(f()).toStrictEqual(5);
  });
});
