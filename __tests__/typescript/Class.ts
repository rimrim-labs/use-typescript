/**
 * Typescript HandBook. Classes
 */

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
