import { Form } from '@arco-design/web-react';
import { useState } from 'react';

const useCreateData = () => {
  const [formInstance] = Form.useForm();
  const [isNewModalVisible, setIsNewModalVisible] = useState<boolean>(false);

  const closeModal = () => setIsNewModalVisible(false);
  const openModal = () => setIsNewModalVisible(true);

  return {
    formInstance,
    isNewModalVisible,
    closeModal,
    openModal,
  };
};

export default useCreateData;
