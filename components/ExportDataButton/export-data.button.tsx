import { Button } from 'antd';
import React from 'react';
import { ExportOutlined } from '@ant-design/icons';

interface ExportDataButtonProps {
  onExport: () => void;
}

const ExportDataButton = (props: ExportDataButtonProps) => {
  return (
    <Button type='text' icon={<ExportOutlined />} onClick={props.onExport} />
  );
};

export default ExportDataButton;
