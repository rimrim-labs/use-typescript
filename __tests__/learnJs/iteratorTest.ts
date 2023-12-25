/**
 * Learning JavaScript ch12. 이터레이터와 제너레이터
 */

import { describe, test, expect } from '@jest/globals';

describe('이터레이터 테스트', () => {
  test('이터레이터로 값을 순회한다.', () => {
    // given
    const arr = ['a', 'b', 'c'];

    // when
    const values = arr.values();

    // then
    expect(values.next().value).toBe('a');
    expect(values.next().value).toBe('b');
    expect(values.next().value).toBe('c');

    expect(values.next().done).toBeTruthy();
    expect(values.next().value).toBeUndefined();
  });

  test('이터레이터 프로토콜로 이터러블 객체를 생성한다.', () => {
    // given
    class Log {
      messages: { message: string; timestamp: number }[];

      constructor() {
        this.messages = [];
      }

      add(message: string) {
        this.messages.push({ message, timestamp: Date.now() });
      }

      // 클래스에 iterator 심볼 메서드를 정의한다.
      [Symbol.iterator]() {
        let i = 0;
        const message = this.messages;

        // next 메서드를 가진 객체를 반환한다.
        return {
          next() {
            if (i >= message.length) return { value: undefined, done: true };
            return { value: message[i++], done: false };
          },
        };
      }
    }

    // when
    const log = new Log();
    log.add('hi');
    log.add('hello');

    // then
    const iter = log[Symbol.iterator]();
    expect(iter.next().done).toStrictEqual(false);
    expect(iter.next().done).toStrictEqual(false);
    expect(iter.next().done).toStrictEqual(true);
  });

  test('이터레이터 프로토콜로 무한 스트림을 생성한다.', () => {
    // given
    class FibonacciSequence {
      [Symbol.iterator]() {
        let a = 0,
          b = 1;
        return {
          next() {
            const rval = { value: b, done: false };
            b += a;
            a = rval.value;
            return rval;
          },
        };
      }
    }

    // when
    const fibo = new FibonacciSequence();
    const fiboIter = fibo[Symbol.iterator]();

    // then
    expect(fiboIter.next()).toStrictEqual({ value: 1, done: false });
    expect(fiboIter.next()).toStrictEqual({ value: 1, done: false });
    expect(fiboIter.next()).toStrictEqual({ value: 2, done: false });
  });
});

describe('제너레이터 테스트', () => {
  test('제너레이터를 생성한다.', () => {
    // given
    function* rainbow() {
      yield 'red';
      yield 'orange';
    }

    // when
    const it = rainbow();

    // then
    expect(it.next()).toStrictEqual({ value: 'red', done: false });
    expect(it.next()).toStrictEqual({ value: 'orange', done: false });
    expect(it.next()).toStrictEqual({ value: undefined, done: true });
  });

  test('yield 표현식으로 next 호출시 제공할 값을 설정한다.', () => {
    // given

    /**
     * yield string
     * return string
     * can be passed in string
     */
    function* interrogate(): Generator<string, string, string> {
      const name = yield 'What is your name?';
      const color = yield 'What is your favorite color?';
      return `${name}'s favorite color is ${color}`;
    }

    // when
    const it = interrogate();

    // then
    expect(it.next()).toStrictEqual({ value: 'What is your name?', done: false });
    expect(it.next('Ethan')).toStrictEqual({ value: 'What is your favorite color?', done: false });
    expect(it.next('orange')).toStrictEqual({ value: "Ethan's favorite color is orange", done: true });
  });

  test('return을 선언하면 제너레이터가 종료된다.', () => {
    // given
    function* abc(): Generator<string, undefined, undefined> {
      yield 'a';
      yield 'b';
      return;

      yield 'c'; // Unrecheable code
    }

    // when
    const it = abc();

    // then
    expect(it.next()).toStrictEqual({ value: 'a', done: false });
    expect(it.next()).toStrictEqual({ value: 'b', done: false });
    expect(it.next()).toStrictEqual({ value: undefined, done: true });
    expect(it.next()).toStrictEqual({ value: undefined, done: true });
  });
});
