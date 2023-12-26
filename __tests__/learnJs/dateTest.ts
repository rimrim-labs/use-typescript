/**
 * Learning JavaScript ch015. 날짜와 시간
 */

import { describe, test, expect } from '@jest/globals';
import moment from 'moment-timezone';

describe('Date 객체 테스트', () => {
  test('UTC 날짜를 생성한다.', () => {
    const d = new Date(Date.UTC(2023, 11, 26)); // 2023-12-26
    console.log(d);
  });

  test('특정 타임존에 종속된 날짜를 생성한다.', () => {
    const d = moment.tz([2023, 11, 26], 'Asia/Seoul').toDate();
    console.log(d);
  });

  test('날짜 데이터를 JSON으로 전송 후 역직렬화를 수행한다.', () => {
    const before = { d: new Date() };
    expect(before.d).toBeInstanceOf(Date);

    // JSON 전송 과정에서 문자열로 변환되었다.
    const json = JSON.stringify(before);
    const after = JSON.parse(json);
    expect(after.d).not.toBeInstanceOf(Date);

    // 새로운 Date 객체를 생성한다.
    after.d = new Date(after.d);
    expect(after.d).toBeInstanceOf(Date);
  });

  test('날찌 형식을 포맷팅한다.', () => {
    const d = new Date(Date.UTC(1930, 4, 10));
    const res = moment(d).format('YYYY-MM-DD');

    expect(res).toBe('1930-05-10');
  });

  test('날짜 연산을 수행한다.', () => {
    const d1 = new Date(1966, 2, 1);
    const d2 = new Date(2009, 4, 27);

    expect(d1 > d2).toBeFalsy();
    expect(d1 < d2).toBeTruthy();
    expect(d2.getTime() - d1.getTime()).toBeGreaterThan(0);
  });
});
