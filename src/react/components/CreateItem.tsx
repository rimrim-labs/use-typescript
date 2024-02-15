import React from 'react';
import { useForm } from 'react-hook-form';

interface ItemInfo {
  name: string;
  price: number;
}

export default function CreateItem() {
  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<ItemInfo>({
    mode: 'onSubmit',
    defaultValues: { name: '', price: 0 },
  });

  const handleSubmit = (data: ItemInfo) => {
    console.log(data);
    reset({ name: '', price: 0 });
  };

  return (
    <>
      {errors.name?.type === 'required' && <p>name 은(는) 필수 값입니다.</p>}
      {errors.price?.type === 'required' && <p>price 은(는) 필수 값입니다.</p>}
      <form onSubmit={onSubmit(handleSubmit)}>
        <div>
          <span>이름</span>
          <input type="text" {...register('name', { required: true })} />
        </div>
        <div>
          <span>비밀번호</span>
          <input type="text" {...register('price', { required: true, min: 0 })} />
        </div>
      </form>
    </>
  );
}
