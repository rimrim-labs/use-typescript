import React, { useEffect, useState } from 'react';
import * as ItemAPI from 'apis/ItemAPI';
import { FetchItemResponse } from '../types/response/Item';

interface Props {
  id: number;
}

export default function ItemInfo({ id }: Props) {
  const [item, setItem] = useState<FetchItemResponse>();

  useEffect(() => {
    (async function () {
      const { data } = await ItemAPI.fetchItem(id);
      setItem(data);
    })();
  }, []);

  return item ? (
    <div>
      <h1>아이템 상세정보</h1>
      <div>상품명:{item.name}</div>
      <div>가격: {item.price}</div>
      <div>재고수량: {item.remain}</div>
      <div>생성날짜: {item.createdAt}</div>
    </div>
  ) : (
    <div>로딩중...</div>
  );
}
