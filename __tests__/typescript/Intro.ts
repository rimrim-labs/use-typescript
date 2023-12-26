/**
 * Typescript HandBook. TypeScript for JavaScript Programmers.
 */

describe('타입 테스트', () => {
  test('인터페이스를 정의한다.', () => {
    // given
    interface User {
      name: string;
      id: number;
    }

    function isUser(obj: unknown): obj is User {
      return Object.prototype.hasOwnProperty.call(obj, 'name') && Object.prototype.hasOwnProperty.call(obj, 'id');
    }

    // when
    const user: User = {
      name: 'Hayes',
      id: 0,
    };

    // then
    expect(isUser(user)).toBeTruthy();
  });

  test('리터럴을 조합해 타입을 선언한다.', () => {
    // 1. 문자열 리터럴
    type LockStates = 'locked' | 'unlocked';
    const locked: LockStates = 'locked';

    // 2. 숫자형 리터럴
    type PositiveOddNumberUnderTen = 1 | 3 | 5 | 7 | 9;
    const num: PositiveOddNumberUnderTen = 3;

    // 3. 불린 리터럴
    type MyBool = true | false;
    const bool: MyBool = true;
  });

  test('동일한 구조를 포함하고 있으면 같은 타입이다. (duck typing)', () => {
    // given
    interface Point {
      x: number;
      y: number;
    }

    function sumPoint(p: Point): number {
      return p.x + p.y;
    }

    // when
    const point = { x: 12, y: 26, z: 27 };

    // then
    expect(sumPoint(point)).toBe(12 + 26);
  });
});
