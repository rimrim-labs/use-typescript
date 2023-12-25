/**
 * Learning JavaScript ch14. 비동기 프로그래밍
 */

import { describe, expect, test } from '@jest/globals';
import fs from 'fs';

describe('콜백 테스트', () => {
  test('setTimeout 콜백 함수를 설정한다.', () => {
    console.log(`before timeout: ${Date.now()}`);

    setTimeout(() => console.log(`after timeout: ${Date.now()}`), 100); // 1초

    console.log('happen after setTimeout');
  });

  test('콜백은 자신을 선언한 스코프 변수에 접근할 수 있다.', () => {
    function countdown() {
      for (let i = 2; i >= 0; i--) {
        setTimeout(
          () => {
            console.log(i === 0 ? 'GO!' : i);
          },
          (2 - i) * 10,
        );
      }
    }

    countdown();
  });

  test('여러 가지를 기다려야 한다면 콜백 지옥에 빠진다.', () => {
    fs.readFile('a.txt', function (err, dataA) {
      if (err) return;
      fs.readFile('b.txt', function (err, dataB) {
        if (err) return;
        fs.readFile('c.txt', function (err, dataC) {
          if (err) return;
          fs.writeFile('d.txt', Buffer.concat([dataA, dataB, dataC]), function (err) {
            if (err) return;
          });
        });
      });
    });
  });
});

function countdown(num: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num === 13) reject(new Error('Oh my god'));
      resolve(num);
    }, 100);
  });
}

describe('프로미스 테스트', () => {
  test('프로미스 객체를 반환한다.', () => {
    countdown(5).then(
      (num) => num,
      (err) => console.log(`coundown experienced an error: ${err.message}`),
    );

    countdown(13).then(
      (num) => num,
      (err) => console.log(`coundown experienced an error: ${err.message}`),
    );
  });

  test('프로미스는 체이닝 가능하다.', () => {
    countdown(5)
      .then(
        (num) => num,
        (err) => console.log(`coundown experienced an error: ${err.message}`),
      )
      .then((num) => console.log(`promise result is ${num}`));
  });
});

describe('async 테스트', () => {
  test('await로 비동기 프로미스를 기다린다.', async () => {
    // when
    const res = await countdown(5).then(
      (num) => num,
      (err) => console.error(err),
    );

    const errRes = await countdown(13).then(null, (err) => err);

    // then
    expect(res).toBe(5);
    expect(errRes).toBeInstanceOf(Error);
  });
});
