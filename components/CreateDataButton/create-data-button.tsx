import { type FormInstance, Button, Modal } from '@arco-design/web-react';
import request from '../../services/request';
import { IconPlus } from '@arco-design/web-react/icon';
import useCreateData from './useCreateData';

interface CreateDataButtonProps<T> {
  postRequest: (...args: any[]) => ReturnType<typeof request<T>>; // POST 方法
  renderForm: (
    form: FormInstance, // 表单实例
    doRequest: (...args: any[]) => void // 执行请求方法
  ) => JSX.Element;
}

const CreateDataButton = <T,>({
  postRequest,
  renderForm,
}: CreateDataButtonProps<T>) => {
  const {
    isNewModalVisible,
    openModal,
    closeModal,
    formInstance,
    postForm,
    submitForm,
  } = useCreateData<T>(postRequest);

  return (
    <>
      <Modal
        title='新建数据'
        visible={isNewModalVisible}
        onCancel={closeModal}
        onOk={submitForm}
      >
        {renderForm(formInstance, postForm)}
      </Modal>
      <Button type='primary' onClick={openModal} style={{ marginBottom: 10 }}>
        <IconPlus />
        新建
      </Button>
    </>
  );
};

export default CreateDataButton;
