/**
 * Typescript HandBook. More on Functions
 */

describe('함수 선언 테스트', () => {
  test('함수 타입을 기입한다.', () => {
    function greeter(fn: (a: string) => string) {
      return fn('Hello, world');
    }

    expect(greeter((str) => `${str} good`)).toEqual('Hello, world good');
  });

  test('함수 타입을 선언한다.', () => {
    type GreetFunction = (a: string) => string;

    function greeter(fn: GreetFunction) {
      return fn('Hello, world');
    }

    expect(greeter((str) => `${str} good`)).toEqual('Hello, world good');
  });

  test('프로퍼티 값을 포함한 함수 타입을 선언한다', () => {
    // given
    type DescribableFunction = {
      description: string;
      (someArg: number): boolean;
    };

    function myFunc(someArg: number) {
      return someArg > 3;
    }

    myFunc.description = 'default description';

    // when
    function doSomething(fn: DescribableFunction) {
      return `${fn.description} returned ${fn(6)}`;
    }

    // then
    expect(doSomething(myFunc)).toEqual('default description returned true');
  });

  test('옵셔널 파라미터를 선언한다.', () => {
    // given
    function f(x?: number) {
      return x;
    }

    // when & then
    expect(f(5)).toEqual(5);
    expect(f()).toBeUndefined();
  });
});

describe('제네릭 함수 테스트', () => {
  test('제네릭 함수를 선언한다.', () => {
    // given
    function firstElement<Type>(arr: Type[]): Type | undefined {
      return arr[0];
    }

    // when & then
    expect(firstElement([1, 3, 4])).toEqual(1);
    expect(firstElement([])).toBeUndefined();
  });

  test('다중 제네릭 파라미터를 선언한다.', () => {
    // given
    function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
      return arr.map(func);
    }

    // when & then
    expect(map(['1', '2', '3'], (n) => parseInt(n, 10))).toEqual([1, 2, 3]);
  });

  test('타입 한정자를 선언한다.', () => {
    // given
    function longest<Type extends { length: number }>(a: Type, b: Type) {
      if (a.length >= b.length) return a;
      return b;
    }

    // when & then
    expect(longest([1], [])).toEqual([1]);
    expect(longest('alice', 'bob')).toEqual('alice');
  });

  test('제네릭 타입을 명시적으로 기입한다.', () => {
    // given
    function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
      return arr1.concat(arr2);
    }

    // when & then
    expect(combine<string | number>([1], ['hello'])).toEqual([1, 'hello']);
  });
});

describe('함수 오버로딩 테스트', () => {
  test('파라미터 타입이 다른 함수들을 오버로딩한다.', () => {
    // given
    function makeDate(timestamp: number): Date;
    function makeDate(m: number, d: number, y: number): Date;

    // 구현 함수의 시그니처는 외부에서 볼 수 없다.
    function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
      if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
      }
      return new Date(mOrTimestamp);
    }

    // when & then
    expect(makeDate(12)).toStrictEqual(new Date(12));
    expect(makeDate(1, 1, 1)).toStrictEqual(new Date(1, 1, 1));
  });
});

describe('this 테스트', () => {
  test('함수의 this 타입을 선언한다. (함수가 언제 호출될지 제어할 수 있음)', () => {
    // given
    interface User {
      id: number;
      admin: boolean;
      becomeAdmin: (this: User) => void;
    }

    const user: User = {
      id: 123,
      admin: false,
      becomeAdmin() {
        this.admin = true;
      },
    };

    // when
    user.becomeAdmin();

    // then
    expect(user.admin).toBeTruthy();
  });
});

describe('타입 테스트', () => {
  test('원시 값이 아닌 모든 타입은 object 이다', () => {
    const f = (arg: object) => arg;
    expect(f({})).toStrictEqual({});
  });

  test('unknown 타입에는 어떤 작업도 불가능하다.', () => {
    function parser(str: string): unknown {
      return JSON.parse(str);
    }

    parser('{"hi":"hello"}');
  });

  test('값을 절대로 반환할 수 없는 함수는 반환 타입으로 never를 할당받는다.', () => {
    function fail(msg: string): never {
      throw new Error(msg);
    }

    expect(() => fail('return type is never')).toThrow(Error);
  });
});
