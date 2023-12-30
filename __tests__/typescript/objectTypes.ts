/**
 * Typescript HandBook. Object Types.
 */

describe('object 타입 테스트', () => {
  test('옵셔널 프로퍼티를 선언한다.', () => {
    // given
    interface PaintOptions {
      shape: string;
      xPos?: number;
      yPos?: number;
    }

    function paintShape(opts: PaintOptions) {
      return opts.shape;
    }

    // when & then
    expect(paintShape({ shape: 'shape' })).toEqual('shape');
    expect(paintShape({ shape: 'shape', xPos: 1 })).toEqual('shape');
    expect(paintShape({ shape: 'shape', xPos: 1, yPos: 1 })).toEqual('shape');
  });

  test('읽기 전용 프로퍼티를 선언한다.', () => {
    interface SomeType {
      readonly prop: string;
    }

    let obj: SomeType = { prop: 'hello' };

    expect(obj.prop).toEqual('hello');
    expect(() => (obj = { prop: 'can assign new ref' })).not.toThrow(Error);
  });

  test('다른 레퍼런스에 의해 readonly 프로퍼티 값이 변할 수 있다.', () => {
    // given
    interface Person {
      name: string;
      age: number;
    }

    interface ReadonlyPerson {
      readonly name: string;
      readonly age: number;
    }

    // when
    const writablePerson: Person = {
      name: 'Person McPersonface',
      age: 42,
    };

    const readOnlyPerson: ReadonlyPerson = writablePerson;

    // then
    expect(readOnlyPerson.age).toEqual(42);

    writablePerson.age += 1;
    expect(readOnlyPerson.age).toEqual(43);
  });

  test('프로퍼티 이름 없이 타입을 명시할 때 인덱스 시그니처를 사용할 수 있다.', () => {
    interface StringArray {
      readonly [index: number]: string;
    }

    // 'number'로 인덱싱하면 'string' 타입을 반환한다.
    const myArray: StringArray = ['a', 'b', 'c'];

    expect(myArray[0]).toEqual('a');
  });
});

describe('타입 변형 테스트', () => {
  test('인터페이스를 상속한다.', () => {
    interface BasicAddress {
      name?: string;
      street: string;
      city: string;
      country: string;
      postalCode: string;
    }

    interface AddressWithUnit extends BasicAddress {
      unit: string;
    }
  });

  test('인터페이스를 합성한다.', () => {
    interface Colorful {
      color: string;
    }

    interface Circle {
      radius: number;
    }

    expect(
      () =>
        ({
          color: 'red',
          radius: 4,
        }) as Colorful & Circle,
    ).not.toThrow(Error);
  });
});

describe('튜플 테스트', () => {
  test('튜플 타입으로 배열의 원소 개수와 타입을 선언한다.', () => {
    type StringNumberPair = readonly [string, number];
    const tuple: StringNumberPair = ['2', 1];
    // tuple[0] = '3';
    expect(tuple.length).toEqual(2);
  });
});
