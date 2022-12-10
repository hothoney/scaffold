import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Button } from 'antd';
import PoweredForm from '../PoweredForm';

interface EditDataButtonProps<T> {
  initialData: T;
  columns: ProColumns<T>[];
  onSubmit?: (values: T) => Promise<boolean> | boolean;
}

const EditDataButton = <T,>({
  columns,
  onSubmit,
  initialData,
}: EditDataButtonProps<T>) => {
  return (
    <>
      <PoweredForm<T>
        columns={columns}
        formType='ModalForm'
        proFormProps={{
          title: '编辑数据',
          trigger: <Button type='link'>编辑</Button>,
          async onFinish(formData) {
            return onSubmit?.(formData);
          },
          initialValues: initialData,
        }}
      />
    </>
  );
};

export default EditDataButton;
