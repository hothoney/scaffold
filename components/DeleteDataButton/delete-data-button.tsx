import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteDataButtonProps {
  onDelete: () => boolean | Promise<boolean>;
}

const DeleteDataButton = ({ onDelete }: DeleteDataButtonProps) => {
  return (
    <Popconfirm title='你确定要删除该数据吗?' onConfirm={onDelete}>
      <Button danger type='text' size='small'>
        删除
      </Button>
    </Popconfirm>
  );
};

export default DeleteDataButton;
