import { Form, Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import request from '../../services/request';

const useCreateData = <T>(
  postRequest: (...args: any[]) => ReturnType<typeof request<T>>
) => {
  const [formInstance] = Form.useForm();
  const [isNewModalVisible, setIsNewModalVisible] = useState<boolean>(false);
  const { run: postForm } = useRequest(postRequest, {
    manual: true,
    onSuccess(data, params) {
      if (data?.data?.success) {
        Message.success('新建成功');
      } else {
        Message.error('新建数据失败');
      }
    },
    onError(e, params) {
      Message.error('新建数据失败');
    },
  });

  const closeModal = () => setIsNewModalVisible(false);
  const openModal = () => setIsNewModalVisible(true);
  const submitForm = () => formInstance.submit();

  return {
    formInstance,
    isNewModalVisible,
    closeModal,
    openModal,
    postForm,
    submitForm,
  };
};

export default useCreateData;
