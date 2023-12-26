/**
 * Learning JavaScript ch020. 노드
 */

import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import http from 'http';

describe('파일시스템 접근 테스트', () => {
  test('파일을 생성한다.', () => {
    try {
      // 어플리케이션이 시작된 디렉터리를 __dirname 변수로 보관한다.
      fs.writeFileSync(path.join(__dirname, '/hello.txt'), 'hello from Node!');
    } catch (err) {
      console.error('Error writing file.');
    }
  });

  test('파일을 읽는다.', () => {
    try {
      const data = fs.readFileSync(path.join(__dirname, '/hello.txt'), { encoding: 'utf-8' });
      expect(data).toBe('hello from Node!');
    } catch (err) {
      console.error('Error reading file.');
    }
  });
});

describe('웹 서버 테스트', () => {
  test('웹 서버를 생성한다.', () => {
    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      console.log(`${req.method} ${req.url}`);
      res.end('Hello world!');
    });

    const port = 8080;
    server.listen(port, () => console.log(`server started on port ${port}`));
  });
});
