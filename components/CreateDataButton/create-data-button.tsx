import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Button } from 'antd';
import PoweredForm from '../PoweredForm';

interface CreateDataButtonProps<T> {
  columns: ProColumns<T>[];
  onSubmit?: (values: T) => Promise<boolean> | boolean;
}

const CreateDataButton = <T,>({
  columns,
  onSubmit,
}: CreateDataButtonProps<T>) => {
  return (
    <>
      <PoweredForm<T>
        columns={columns}
        formType='ModalForm'
        proFormProps={{
          title: '新增数据',
          trigger: (
            <Button type='primary' prefix='+'>
              新建
            </Button>
          ),
          async onFinish(formData) {
            return onSubmit?.(formData);
          },
        }}
      />
    </>
  );
};

export default CreateDataButton;
