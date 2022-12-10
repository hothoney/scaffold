import {
  ModalForm,
  ModalFormProps,
  ProColumns,
  ProForm,
  ProFormDatePicker,
  ProFormProps,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';

export interface PoweredFormProps<T = any> {
  columns: ProColumns<T>[];
  formType: // 'LightFilter'|
  'ProForm' | 'ModalForm';
  // 'DrawerForm'|
  // 'QueryFilter'|
  // 'StepsForm'|
  // 'LoginForm'
  proFormProps?: ProFormProps<T> | ModalFormProps<T>;
}

const PoweredForm = <T,>({
  columns,
  formType,
  proFormProps,
}: PoweredFormProps<T>) => {
  const formContent = columns.map((column, index) => {
    const formItemProp = {
      name: column.dataIndex || column.key || '',
      key: column.key || index,
      label: column.title || column.dataIndex || '',
    };
    if (column.valueType === 'select') {
      return (
        <ProFormSelect
          {...column}
          {...column.proFieldProps}
          {...formItemProp}
        />
      );
    }
    if (column.valueType === 'date') {
      return <ProFormDatePicker {...column.proFieldProps} {...formItemProp} />;
    }
    return <ProFormText {...column.proFieldProps} {...formItemProp} />;
  });
  if (formType === 'ModalForm') {
    return <ModalForm {...proFormProps}>{formContent}</ModalForm>;
  }
  return <ProForm {...(proFormProps as ProFormProps)}>{formContent}</ProForm>;
};

export default PoweredForm;
