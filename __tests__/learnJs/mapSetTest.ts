/**
 * Learning JavaScript ch10. 맵과 셋
 */

import { describe, test, expect } from '@jest/globals';

describe('map 테스트', () => {
  test('키와 값을 연결한다.', () => {
    // given
    const u1 = { name: 'Cynthia' };
    const u2 = { name: 'Jackson' };
    const u3 = { name: 'Olive' };

    // when
    const userRoles = new Map([
      [u1, 'User'],
      [u2, 'User'],
      [u3, 'Admin'],
    ]);

    // then
    expect(userRoles.get(u1)).toStrictEqual('User');
    expect(userRoles.has(u2)).toBeTruthy();
    expect(userRoles.get({ name: 'James' })).toBeUndefined();
  });

  test('Map 메서드를 호출한다.', () => {
    // given
    const u1 = { name: 'Cynthia' };
    const u2 = { name: 'Jackson' };
    const u3 = { name: 'Olive' };

    const userRoles = new Map([
      [u1, 'User'],
      [u2, 'User'],
      [u3, 'Admin'],
    ]);

    // when & then
    expect(userRoles.size).toBe(3);
    expect([...userRoles.values()]).toContain('User');
    expect([...userRoles.values()]).toContain('Admin');
  });

  test('WeakMap 키는 가비지 컬렉션의 대상이 된다.', () => {
    // given
    const SecretHolder = (function () {
      const secrets = new WeakMap();

      return class {
        setSecret(secret: string) {
          secrets.set(this, secret);
        }

        getSecret() {
          return secrets.get(this);
        }
      };
    })();

    // when
    const a = new SecretHolder();
    const b = new SecretHolder();

    a.setSecret("a's secret");
    b.setSecret("b's secret");

    // then
    expect(a.getSecret()).toEqual("a's secret");
    expect(b.getSecret()).toEqual("b's secret");
  });
});

describe('set 테스트', () => {
  test('set은 중복을 허용하지 않는다.', () => {
    // given
    const roles = new Set();

    // when
    roles.add('Admin').add('User').add('User');

    // then
    expect(roles.has('Admin')).toBeTruthy();
    expect(roles.has('User')).toBeTruthy();
    expect(roles.size).toBe(2);
    expect(roles.delete('Admin')).toBeTruthy();
  });

  test('WeakSet 원소는 가비지 컬렉션의 대상이 된다.', () => {
    // given
    const naughty = new WeakSet();
    const children = [{ name: 'Suzy' }, { name: 'Derek' }];

    // when
    naughty.add(children[0]);

    // then
    expect(naughty.has(children[0])).toBeTruthy();
    expect(naughty.has(children[1])).toBeFalsy();
  });
});
