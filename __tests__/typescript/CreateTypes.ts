/**
 * Typescript HandBook. Creating Types from Types
 */

describe('제네릭 테스트', () => {
  test('제네릭 함수 타입을 선언한다.', () => {
    function identity<Type>(arg: Type): Type {
      return arg;
    }

    const g1: <Type>(arg: Type) => Type = identity;
    const g2: { <Type>(arg: Type): Type } = identity;

    expect(g1('hi')).toEqual('hi');
    expect(g2('hi')).toEqual('hi');
  });

  test('제네릭 클래스를 선언한다.', () => {
    // given
    class GenericNumber<NumType> {
      value: NumType;

      add: (x: NumType, y: NumType) => NumType;

      constructor(value: NumType, add: (x: NumType, y: NumType) => NumType) {
        this.value = value;
        this.add = add;
      }
    }

    // when
    const myGenericNumber = new GenericNumber<number>(0, function (x, y) {
      return x + y;
    });

    // then
    expect(myGenericNumber.add(1, 2)).toEqual(3);
  });

  test('타입 파라미터를 타입 한정자로 사용한다.', () => {
    // given
    function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
      return obj[key];
    }

    // when
    const x = { a: 1, b: 2, c: 3, d: 4 };

    // then
    expect(getProperty(x, 'a')).toEqual(1);
  });

  test('클래스 타입을 타입 파라미터로 사용한다.', () => {
    // given
    class User {
      id: number = 0;
    }

    // when
    function create<Type>(Clazz: { new (): Type }): Type {
      return new Clazz();
    }

    // then
    expect(create(User).id).toEqual(0);
  });

  test('생성자 파라미터에 자식 클래스를 전달한다.', () => {
    // given
    class BeeKeeper {
      hasMask: boolean = true;
    }

    class ZooKeeper {
      nametag: string = 'Mike';
    }

    class Animal {
      numLegs: number = 4;
    }

    class Bee extends Animal {
      numLegs = 6;

      keeper: BeeKeeper = new BeeKeeper();
    }

    class Lion extends Animal {
      keeper: ZooKeeper = new ZooKeeper();
    }

    // when
    function createInstance<A extends Animal>(C: new () => A) {
      return new C();
    }

    // then
    expect(createInstance(Lion).keeper.nametag).toEqual('Mike');
    expect(createInstance(Bee).keeper.hasMask).toBeTruthy();
  });
});

describe('Keyof 연산자 테스트', () => {
  test('객체 key 타입을 반환한다.', () => {
    type Point = { x: number; y: number };
    type P = keyof Point;
    expect(() => {
      const key = 'x' as P;
    }).not.toThrow(Error);
  });

  test('인덱스 시그니처를 갖고 있는 타입이면 인덱스 타입을 반환한다.', () => {
    type Arrayish = { [n: number]: unknown };
    type A = keyof Arrayish;
    expect(() => {
      const key = 1 as A;
    }).not.toThrow(Error);
  });
});

describe('Typeof 연산자 테스트', () => {
  test('변수 타입을 반환한다.', () => {
    expect(typeof 'Hello world').toEqual('string');
  });

  test('ReturnType 과 조합해 함수 반환 타입을 선언한다.', () => {
    // given
    function f() {
      return { x: 10, y: 3 };
    }

    type P = ReturnType<typeof f>;

    // when & then
    expect(() => {
      const res: P = { x: 2, y: 3 };
    }).not.toThrow(Error);
  });
});

describe('인덱스 접근 타입 테스트', () => {
  test('인덱스 접근으로 타입을 선언한다.', () => {
    // given
    type Person = { age: number; name: string; alive: boolean };

    // when
    type I1 = Person['age' | 'name'];
    type I2 = Person[keyof Person];

    type AliveOrName = 'alive' | 'name';
    type I3 = Person[AliveOrName];
  });

  test('array 인덱스 접근으로 타입을 선언한다.', () => {
    // given
    const MyArray = [
      { name: 'Alice', age: 15 },
      { name: 'Bob', age: 23 },
      { name: 'Eve', age: 38 },
    ];

    // when
    type Person = (typeof MyArray)[number];
    type Age1 = (typeof MyArray)[number]['age'];
    type Age2 = Person['age'];

    // 인덱싱 접근에서는 타입만 사용 가능하다.
    // const key = 'age';
    // type Age = Person[key];
  });
});

describe('conditional 타입 테스트', () => {
  test('입력 타입에 따라 타입을 선택한다.', () => {
    // given
    interface Animal {
      live(): void;
    }

    interface Dog extends Animal {
      woof(): void;
    }

    // when
    type A = Dog extends Animal ? number : string;
    type B = RegExp extends Animal ? number : string;

    // then
    expect(() => {
      const a: A = 3;
    }).not.toThrow(Error);
    expect(() => {
      const b: B = '3';
    }).not.toThrow(Error);
  });

  test('제네릭과 conditional 타입을 함께 사용한다.', () => {
    // given
    type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;

    interface Email {
      message: string;
    }

    interface Dog {
      bark(): void;
    }

    // when
    type EmailMessageContents = MessageOf<Email>;
    type DogMessageContents = MessageOf<Dog>;

    // then
    expect(() => {
      const em: EmailMessageContents = 'hi';
    }).not.toThrow();
  });

  test('infer 키워드로 타입 값을 추론한다.', () => {
    type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
    type Num = GetReturnType<() => number>; // number
    type Str = GetReturnType<(x: string) => string>; // string
    type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean
  });
});

describe('타입 매핑 테스트', () => {
  test('프로퍼티 키를 매핑해 타입을 선언한다.', () => {
    // given
    type OptionsFlags<Type> = {
      [Property in keyof Type]: boolean;
    };

    type Features = {
      darkMode: () => void;
      newUserProfile: () => void;
    };

    // when
    type FeatureOptions = OptionsFlags<Features>;

    // then
    expect(() => {
      const opts: FeatureOptions = {
        darkMode: false,
        newUserProfile: true,
      };
    }).not.toThrow(Error);
  });

  test('매핑된 키를 읽기 전용 속성을 수정한다.', () => {
    // readonly 속성을 제거한다.
    type CreateMutable<Type> = {
      -readonly [Property in keyof Type]: Type[Property];
    };

    type LockedAccount = {
      readonly id: string;
      readonly name: string;
    };

    // when
    type UnlockedAccount = CreateMutable<LockedAccount>;

    // then
    expect(() => {
      const acc: UnlockedAccount = {
        id: '1',
        name: 'hi',
      };
      acc.id = '2';
      acc.name = 'hello';
    }).not.toThrow(Error);
  });

  test('매핑된 키를 옵션 속성을 수정한다.', () => {
    // optional 속성을 제거한다.
    type Concrete<Type> = {
      [Property in keyof Type]-?: Type[Property];
    };

    type MaybeUser = {
      id: string;
      name?: string;
    };

    // when
    type User = Concrete<MaybeUser>;

    // then
    expect(() => {
      const user: User = {
        id: '1',
        name: 'hi',
      };
    }).not.toThrow(Error);
  });
});

describe('템플릿 리터럴 테스트', () => {
  test('문자열 템플릿으로 새로운 타입을 조합한디.', () => {
    type World = 'world';
    type Greeting = `hello ${World}`;
  });
});
