/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Learning JavaScript ch10. 객체와 객체지향 프로그래밍
 */

import { describe, test, expect } from '@jest/globals';

class Car {
  vin;
  make;
  model;
  userGears = ['P', 'N', 'R', 'D'];
  userGear = this.userGears[0];

  static nextVin = 0;

  constructor(make: string, model: string) {
    this.vin = Car.getNextVin();
    this.make = make;
    this.model = model;
  }

  static getNextVin() {
    return Car.nextVin++;
  }

  static areSimilar(car1: Car, car2: Car) {
    return car1.make === car2.make && car1.model === car2.model;
  }

  shift(gear: string) {
    if (this.userGear.indexOf(gear) < 0) throw new Error(`Invalid gear: ${gear}`);
    this.userGear = gear;
  }
}

describe('프로퍼티 나열 테스트', () => {
  test('for...in으로 객체 프로퍼티를 순회한다.', () => {
    // given
    const obj = {
      name: 'a',
      age: 12,
      id: 21,
    };

    // when
    const keys = [];

    for (const key in obj) {
      keys.push(key);
    }

    // then
    expect(keys).toStrictEqual(['name', 'age', 'id']);
  });

  test('Object.keys는 객체 프로퍼티를 배열로 반환한다.', () => {
    // given
    const obj = {
      name: 'a',
      age: 12,
      id: 21,
    };

    // when & then
    expect(Object.keys(obj)).toStrictEqual(['name', 'age', 'id']);
  });
});

describe('클래스 테스트', () => {
  test('클래스 인스턴스를 생성한다.', () => {
    // when
    const car1 = new Car('Tesla', 'Model S');
    const car2 = new Car('Mazda', '3i');

    // then
    expect(car1).toBeInstanceOf(Car);
    expect(car2).toBeInstanceOf(Car);
  });
});

describe('프로토타입 테스트', () => {
  test('인스턴스는 프로토타입 메서드를 공유한다.', () => {
    // given
    const car1 = new Car('Tesla', 'Model S');
    const car2 = new Car('Mazda', '3i');

    // when & then
    expect(car1.shift).toStrictEqual(car2.shift);
    expect(car1.shift).toStrictEqual(Car.prototype.shift);
  });

  test('인스턴스에 새로운 메서드를 정의하면 프로토타입 메서드는 가려진다.', () => {
    // given
    const car1 = new Car('Tesla', 'Model S');
    const car2 = new Car('Mazda', '3i');

    // when
    car1.shift = function (gear: string) {
      this.userGear = gear.toUpperCase();
    };

    // then
    expect(car1.shift).not.toStrictEqual(car2.shift);
    expect(car1.shift).not.toStrictEqual(Car.prototype.shift);
  });

  test('클래스 정적 메서드를 정의한다.', () => {
    // given
    const car1 = new Car('Tesla', 'Model S');
    const car2 = new Car('Tesla', 'Model S');

    // when & then
    expect(car1.vin).not.toStrictEqual(car2.vin);
    expect(Car.areSimilar(car1, car2)).toBeTruthy();
  });
});

describe('상속 테스트', () => {
  class Vehicle {
    passengers: string[];

    constructor() {
      this.passengers = [];
    }

    addPassenger(p: string) {
      this.passengers.push(p);
    }
  }

  class Car extends Vehicle {
    constructor() {
      super();
    }

    deployAirbags() {
      return 'BWOOSH!';
    }
  }

  test('서브 클래스를 생성한다.', () => {
    // when
    const car = new Car();
    car.addPassenger('one');
    car.addPassenger('two');

    // then
    expect(car.deployAirbags()).toStrictEqual('BWOOSH!');
    expect(car.passengers).toStrictEqual(['one', 'two']);
  });

  test('instanceof 연산자로 객체가 클래스의 인스턴스인지 확인할 수 있다.', () => {
    // given
    class Motorcycle extends Vehicle {}

    const c = new Car();
    const m = new Motorcycle();

    // when & then
    expect(c).toBeInstanceOf(Vehicle);
    expect(m).toBeInstanceOf(Vehicle);
    expect(c).not.toBeInstanceOf(Motorcycle);

    // 모든 객체는 Object의 인스턴스이다.
    expect(c).toBeInstanceOf(Object);
  });
});

describe('믹스인 테스트', () => {
  test('믹스인을 적용한다.', () => {
    // given
    class InsurancePolicy {}

    type Constructor = new (...args: any[]) => object;

    function MakeInsurable<TBase extends Constructor>(Base: TBase) {
      return class InsurableBase extends Base {
        insurancePolicy: InsurancePolicy | null = null;

        addInsurancePolicy(p: InsurancePolicy) {
          this.insurancePolicy = p;
        }

        getInsurancePolicy() {
          return this.insurancePolicy;
        }

        isInsured() {
          return !!this.insurancePolicy;
        }
      };
    }

    // when
    const InsurableCar = MakeInsurable(Car);
    const newCar = new InsurableCar('Tesla', 'Model S');
    newCar.addInsurancePolicy(new InsurancePolicy());

    // then
    expect(newCar.insurancePolicy).not.toBeNull();
    expect(newCar.isInsured).toBeTruthy();
  });
});
