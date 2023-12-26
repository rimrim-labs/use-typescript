/**
 * Learning JavaScript ch018. 브라우저와 스크립트
 */

import { describe, test, expect } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('DOM 테스트', () => {
  let document: Document;
  let html: string;

  beforeAll(() => {
    html = readFileSync(resolve(__dirname, './simple.html')).toString();
  });

  beforeEach(() => {
    document = new JSDOM(html.toString()).window.document;
  });

  test('DOM에서 원하는 HTML 요소를 가져온다.', () => {
    const content = document.getElementById('content'); // ID로 검색
    const callout = document.getElementsByClassName('callout'); // 클래스로 검색
    const paragraphs = document.getElementsByTagName('p'); // 태그 이름으로 검색

    expect(content).not.toBeNull();
    expect(callout).not.toBeNull();
    expect(paragraphs).not.toBeNull();
  });

  test('CSS 선택자로 요소를 가져온다.', () => {
    const spans = document.querySelectorAll('span.code');
    const calloutFancy = document.querySelectorAll('div.callout.fancy');

    expect(spans.length).toBe(2);
    expect(calloutFancy.length).toBe(1);
    expect(calloutFancy[0].id).toBe('callout2');
  });

  test('CSS 선택자를 사용해 위치 기준으로 요소를 가져온다.', () => {
    const paragraphs = document.querySelectorAll('#callout2 > p'); // 자식 요소 선택
    const contents = document.querySelectorAll('#content p'); // 자손 요소 선택

    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].innerHTML).toBe('A single HTML element can have multiple classes.');
    expect(contents.length).toBe(5);
  });

  test('CSS 선택자로 요소를 가져온다.', () => {
    const spans = document.querySelectorAll('span.code');
    const calloutFancy = document.querySelectorAll('div.callout.fancy');

    expect(spans.length).toBe(2);
    expect(calloutFancy.length).toBe(1);
    expect(calloutFancy[0].id).toBe('callout2');
  });

  test('DOM 컨텐츠를 수정한다.', () => {
    const calloutFancy = document.querySelector('div.callout.fancy');
    if (calloutFancy) calloutFancy.innerHTML = 'Modified HTML file';

    expect(calloutFancy).not.toBeNull();
    expect(calloutFancy?.innerHTML).toBe('Modified HTML file');
  });

  test('DOM 노드를 추가한다', () => {
    // given
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    p1.textContent = 'I was created dynamically';
    p2.textContent = 'I was also created dynamically';

    const parent = document.getElementById('content');
    const firstChild = parent?.childNodes[0];

    // when
    if (firstChild) {
      parent?.insertBefore(p1, firstChild); // 첫 번째 요소로 추가한다.
      parent?.append(p2); // 마지막 요소로 추가한다.
    }

    // then
    const childNodes = parent?.childNodes;
    expect(childNodes?.[0].textContent).toBe('I was created dynamically');
    expect(childNodes?.[childNodes.length - 1].textContent).toBe('I was also created dynamically');
  });

  test('DOM 요소에 스타일 클래스를 추가하고 제거한다.', () => {
    const ptags = document.getElementsByTagName('p');
    for (const ptag of ptags) {
      ptag.classList.add('hightlight');
    }

    const pHighlights = document.querySelectorAll('p.hightlight');
    for (const pHighlight of pHighlights) {
      pHighlight.classList.remove('highlight');
    }
  });
});

describe('DOM 이벤트 테스트', () => {
  function hightlightParas(elem: HTMLParagraphElement) {
    elem.classList.add('highlight');
  }

  test('클릭 이벤트를 설정한다.', () => {
    const paras = document.getElementsByTagName('p');
    for (const para of paras) {
      para.addEventListener('click', (evt) => {
        // 모든 요소에는 addEventListener 메서드가 존재한다.
        evt.preventDefault(); // 기본 핸들러의 동작을 막는다.
        hightlightParas(para);
      });
    }
  });
});
