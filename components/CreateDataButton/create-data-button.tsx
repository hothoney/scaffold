import {
  type FormInstance,
  Modal,
  TableColumnProps,
  Form,
  Grid,
  Input,
} from '@arco-design/web-react';
import request from '../../services/request';
import { IconPlus } from '@arco-design/web-react/icon';
import useCreateData from './useCreateData';
import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Button, message } from 'antd';

interface CreateDataButtonProps<T> {
  columns: ProColumns<T>[];
  onSubmit?: (values: T) => Promise<boolean> | boolean;
  onSuccess?: () => void;
  onError?: (e?: unknown) => void;
}

const { Row, Col } = Grid;

const CreateDataButton = <T,>({
  columns,
  onSubmit,
  onError,
  onSuccess,
}: CreateDataButtonProps<T>) => {
  const { isNewModalVisible, openModal, closeModal, formInstance } =
    useCreateData();

  return (
    <>
      <Modal
        title='新建数据'
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
        <Form form={formInstance}>
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
      <Button type='primary' prefix='+' onClick={openModal}>
        新建
      </Button>
    </>
  );
};

export default CreateDataButton;
