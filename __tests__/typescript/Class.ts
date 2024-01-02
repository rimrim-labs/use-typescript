/**
 * Typescript HandBook. Classes
 */

describe('타입 합성 테스트', () => {
  test('공통 필드를 갖는 유니언 타입 선언', () => {
    // given
    type A = {
      a: string;
      b: string;
    };
    type B = {
      b: string;
    };

    // when
    type AB = A | B;

    // then
    const ab: AB = { b: 'hi' };
    expect(ab.b).toEqual('hi');
  });

  test('여러 타입을 결헙한 교차 타입 선언', () => {
    // given
    type A = {
      a: string;
    };
    type B = {
      b: string;
    };

    // when
    type AB = A & B;

    // then
    const ab: AB = { a: 'hi', b: 'hello' };
    expect(ab.a).toEqual('hi');
    expect(ab.b).toEqual('hello');
  });
});

describe('클래스 테스트', () => {
  test('readonly 필드는 클래스 생성자에서 초기화해야 한다.', () => {
    class Greeter {
      readonly name: string = 'world';

      constructor(otherName?: string) {
        if (otherName !== undefined) {
          this.name = otherName;
        }
      }
    }
  });

  test('클래스 생성자를 오버로딩한다.', () => {
    class Point {
      constructor(x: number, y: string);
      constructor(s: string);
      constructor(xs: any, y?: any) {}
    }
  });

  test('클래스 접근자를 선언한다.', () => {
    class C {
      _length = 0;

      get length() {
        return this._length;
      }

      set length(value) {
        this._length = value;
      }
    }
  });

  test('제네릭 클래스를 선언한다.', () => {
    // given
    class Box<Type> {
      contents: Type;

      constructor(value: Type) {
        this.contents = value;
      }
    }

    // when & then
    const b = new Box('hello');
    expect(b.contents).toEqual('hello');
  });
});

describe('클래스 필드 접근 제어', () => {
  test('클래스 멤버 접근 제어자를 선언한다.', () => {
    class Greeter {
      public greet() {
        return `Hello, ${this.getName()}`;
      }

      protected getName() {
        return 'hi';
      }
    }

    class SpecialGreeter extends Greeter {
      private x = 0;

      public howdy() {
        return `Howdy, ${this.getName()};`;
      }
    }

    const g = new SpecialGreeter();
    expect(g.greet()).toEqual('Hello, hi');
  });

  test('필드 접근 제어자는 컴파일 타임에만 검사된다.', () => {
    class MySafe {
      private secretKey = 12345; // soft private
      #barkAmount = 0; // hard private
    }

    const s = new MySafe();
    expect(s['secretKey']).toEqual(12345);
  });
});

describe('정적 클래스 테스트', () => {
  test('클래스 정적 멤버를 선언한다.', () => {
    // given
    class MyClass {
      private static x = 0;

      static getX() {
        return MyClass.x;
      }
    }

    // when & then
    expect(MyClass.getX()).toEqual(0);
  });

  test('클래스 정적 멤버는 상속된다.', () => {
    // given
    class Base {
      static getGreeting() {
        return 'Hello world';
      }
    }

    class Derived extends Base {
      static myGreeting = Derived.getGreeting();
    }

    // when & then
    expect(Derived.myGreeting).toEqual(Base.getGreeting());
  });

  test('정적 초기화 블록을 선언한다.', () => {
    // given
    function initialize() {
      return Math.floor(Math.random() * 10);
    }

    class Foo {
      static #count = 0;

      get count() {
        return Foo.#count;
      }

      static {
        const result = initialize();
        Foo.#count += result;
      }
    }

    // when & then
    const foo = new Foo();
    expect(foo.count).toBeGreaterThan(0);
  });
});

describe('클래스 this 테스트', () => {
  test('호출 컨텍스트에 따라 this가 할당된다', () => {
    // given
    class MyClass {
      name = 'MyClass';

      getName() {
        return this.name;
      }
    }

    // when
    const c = new MyClass();
    const obj = {
      name: 'obj',
      getName: c.getName,
    };

    // then
    expect(obj.getName()).toEqual('obj');
  });

  test('화살표 함수를 사용한다.', () => {
    // given
    class MyClass {
      name = 'MyClass';

      getName = () => {
        return this.name;
      };
    }

    // when
    const c = new MyClass();
    const obj = {
      name: 'obj',
      getName: c.getName,
    };

    // then
    expect(obj.getName()).toEqual('MyClass');
  });

  test('this 타입을 지정한다.', () => {
    // given
    class MyClass {
      name = 'MyClass';

      getName(this: MyClass) {
        return this.name;
      }
    }

    // when
    const c = new MyClass();
    expect(c.getName()).toEqual('MyClass');
  });

  test('this 기반의 타입 가드를 작성한다.', () => {
    // given
    class FileSystemObject {
      isFile(): this is FileRep {
        return this instanceof FileRep;
      }

      isDirectory(): this is Directory {
        return this instanceof Directory;
      }

      isNetworked(): this is Networked & this {
        return this.networked;
      }

      constructor(
        public path: string,
        private networked: boolean,
      ) {}
    }

    class FileRep extends FileSystemObject {
      constructor(
        path: string,
        public content: string,
      ) {
        super(path, false);
      }
    }

    class Directory extends FileSystemObject {
      children: FileSystemObject[] = [];
    }

    interface Networked {
      host: string;
    }

    // when
    const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo');

    // then
    if (fso.isFile()) {
      expect(fso).toBeInstanceOf(FileRep);
    } else if (fso.isDirectory()) {
      expect(fso).toBeInstanceOf(Directory);
    } else if (fso.isNetworked()) {
      expect(fso.host).not.toBe('');
    }
  });

  test('타입 가드로 필드를 체크한다.', () => {
    // given
    class Box<T> {
      value?: T;

      hasValue(): this is { value: T } {
        return this.value !== undefined;
      }
    }

    // when
    const box = new Box();
    box.value = 'Gameboy';

    // then
    if (box.hasValue()) {
      expect(box.value).toEqual('Gameboy');
    }
  });
});

describe('추상 클래스 테스트', () => {
  abstract class Base {
    abstract getName(): string;

    helloName() {
      return `Hello, ` + this.getName();
    }
  }

  test('추상 필드를 갖는 추상 클래스를 선언한다.', () => {
    // when
    class Derived extends Base {
      getName() {
        return 'world';
      }
    }

    // then
    const d = new Derived();
    expect(d.helloName()).toEqual('Hello, world');
  });

  test('추싱 클래스를 상속한 인스턴스의 생성자를 파라미터로 받는다.', () => {
    // given
    function greet(Ctor: new () => Base) {
      const instance = new Ctor();
      return instance.helloName();
    }

    // when
    class Derived extends Base {
      getName() {
        return 'world';
      }
    }

    // then
    expect(greet(Derived)).toEqual('Hello, world');
  });

  test('클래스 타입을 구조적으로 비교한다.', () => {
    // given
    class P1 {
      x = 0;
      y = 0;
    }

    class P2 {
      x = 0;
      y = 0;
    }

    // when & then
    expect(() => {
      const p: P1 = new P2();
    }).not.toThrow(Error);
  });

  test('클래스 상속 관계를 구조적으로 비교한다.', () => {
    // given
    class Person {
      constructor(
        public name: string,
        public age: number,
      ) {}
    }

    class Employee {
      constructor(
        public name: string,
        public age: number,
        public salary: number,
      ) {}
    }

    // when & then
    expect(() => {
      const p: Person = new Employee('hi', 20, 200_000_000);
    }).not.toThrow(Error);
  });
});
