/**
 * Typescript HandBook. Everyday Types.
 */

describe('타입 테스트', () => {
  test('any 타입은 컴파일 에러를 일으키지 않는다.', () => {
    // given
    let obj: any = { x: 0 };

    // when & then
    expect(() => obj.foo()).toThrow(TypeError);
    expect(() => obj()).toThrow(TypeError);
    obj.bar = 1000;
    obj = 'hello';
  });

  test('함수 타입을 정의한다.', async () => {
    function greet(name: string): string {
      return `hello, ${name.toUpperCase()}!!`;
    }

    async function getFavoriteNumber(): Promise<number> {
      return 26;
    }

    expect(greet('rim')).toEqual('hello, RIM!!');
    expect(await getFavoriteNumber()).toEqual(26);
  });

  test('객체 타입을 정의한다.', () => {
    function sumCoord(pt: { x: number; y: number }) {
      return pt.x + pt.y;
    }

    expect(sumCoord({ x: 3, y: 5 })).toEqual(8);
  });

  test('옵셔널 타입을 정의한다.', () => {
    // given
    type ObjT = {
      first: string;
      last?: string;
    };

    // when
    const obj1: ObjT = { first: 'hi' };
    const obj2: ObjT = { first: 'hi', last: 'bye' };

    // then
    expect(Object.prototype.hasOwnProperty.call(obj2, 'last')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(obj1, 'last')).toBeFalsy();

    expect(obj1.last).toBeUndefined();
    expect(obj1.last?.toUpperCase()).toBeUndefined();
  });

  test('유니온 타입을 정의한다.', () => {
    function mapId(id: number | string) {
      if (typeof id === 'string') return id.toUpperCase();
      return id;
    }

    function welcomePeople(x: string[] | string) {
      if (Array.isArray(x)) return `Hello, ${x.join(' and ')}`;
      return `Welcome alone traveler ${x}`;
    }

    expect(mapId('hi')).toEqual('HI');
    expect(welcomePeople(['hi', 'hello'])).toEqual('Hello, hi and hello');
  });

  test('구체적인 변수 타입을 선언할 수 있다.', () => {
    type Locks = 'unlocked' | 'locked';
    // 더 구체적인 타입을 선택한다.
    const lockState = 'locked' as Locks;
    expect(lockState).toEqual('locked');
  });

  test('리터럴 인터페이스를 정의한다.', () => {
    const obj = { counter: 0 } as const;

    // 값을 수정 불가능하게 하며 더욱 구체적인 타입을 사용하도록 한다.
    expect(obj.counter).toEqual(0);
  });
});
