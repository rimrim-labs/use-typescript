import React from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';

interface CreateItem {
  id: string;
  name: string;
}

// 유효성 검사
const createItemSchema = object({
  id: string().typeError('id 은(는) 문자 값이어야 합니다.').required('id 은(는) 필수 값입니다.'),
  name: string().typeError('name 은(는) 문자 값이어야 합니다.').required('name 은(는) 필수 값입니다.'),
});

export function CreateNewItem() {
  // 초깃값 생성
  const itemInput = useFormik<CreateItem>({
    initialValues: {
      id: '',
      name: '',
    },
    validationSchema: createItemSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <input value={itemInput.values.id} type="text" id="id" name="id" onChange={itemInput.handleChange} />
      <input value={itemInput.values.name} type="text" id="id" name="name" onChange={itemInput.handleChange} />
      <button type="submit" onClick={() => itemInput.handleSubmit}>
        완료.
      </button>
    </div>
  );
}
