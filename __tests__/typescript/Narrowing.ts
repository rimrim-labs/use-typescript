/**
 * Typescript HandBook. Narrowing.
 */

describe('type narrowing 테스트', () => {
  test('typeof null은 object 다.', () => {
    expect(typeof null).toEqual('object');
  });

  test('!! 연산자로 변수를 bool 타입으로 변환한다', () => {
    expect(!!'word').toBeTruthy();
    expect(typeof !!'word').toEqual('boolean');
  });

  test('in 연산자로 객체가 특정 프로퍼티를 보유하고 있는지 체크한다.', () => {
    type Fish = { swim: () => void };
    type Bird = { fly: () => void };

    function move(animal: Fish | Bird) {
      if ('swim' in animal) return animal.swim();
      return animal.fly();
    }

    move({
      swim() {},
    });
  });

  test('시용자 정의 타입 가드 (user defined type guards) 를 작성한다.', () => {
    type Fish = { swim: () => void };
    type Bird = { fly: () => void };

    // type predicate 을 반환한다. (parameterName is Type)
    function isFish(pet: Fish | Bird): pet is Fish {
      return (pet as Fish).swim !== undefined;
    }

    const bird: Bird = {
      fly() {
        console.log('I`m a bird!!');
      },
    };

    expect(isFish(bird)).toBeFalsy();
  });
});
