import { Modal, Form, Grid, Input } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useEditData from './useEditData';
import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Button } from 'antd';

interface EditDataButtonProps<T> {
  initialData: T;
  columns: ProColumns<T>[];
  onSubmit?: (values: T) => Promise<boolean> | boolean;
  onSuccess?: () => void;
  onError?: (e?: unknown) => void;
}

const { Row, Col } = Grid;

const EditDataButton = <T,>({
  initialData,
  columns,
  onSubmit,
  onError,
  onSuccess,
}: EditDataButtonProps<T>) => {
  const { isNewModalVisible, openModal, closeModal, formInstance } =
    useEditData();

  return (
    <>
      <Modal
        title='编辑数据'
        visible={isNewModalVisible}
        onCancel={closeModal}
        onOk={async () => {
          try {
            await formInstance.validate();
            const values = formInstance.getFieldsValue();
            const result =
              onSubmit &&
              typeof onSubmit === 'function' &&
              onSubmit(values as T);
            if (result) {
              onSuccess && typeof onSuccess === 'function' && onSuccess();
              formInstance.resetFields();
              closeModal();
            } else {
              onError && typeof onError === 'function' && onError();
            }
          } catch (error) {
            onError && typeof onError === 'function' && onError(error);
          }
        }}
      >
        <Form form={formInstance} initialValues={initialData}>
          <Row>
            {columns.map((column) => (
              <Col span={24} key={column.key}>
                <Form.Item
                  field={column.dataIndex as string}
                  label={column.title as React.ReactNode}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal>
      <Button type='link' onClick={openModal} size='small'>
        编辑
      </Button>
    </>
  );
};

export default EditDataButton;
