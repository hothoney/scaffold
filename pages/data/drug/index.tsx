import {
  Table,
  type TableColumnProps,
  Form,
  Input,
  Radio,
  type FormInstance,
  Button,
  Divider,
  Popconfirm,
  Message,
} from '@arco-design/web-react';
import request from '../../../services/request';
import { apisConfig } from '../../../config';
import Head from 'next/head';
import CreateDataButton from '../../../components/CreateDataButton';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import TableFilter from '../../../components/TableFilter/table-filter';
import ProTable from '../../../components/ProTable';

interface DrugData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  name: string;
  usage: number;
  description: string;
}

enum UsageEnum {
  // 口服
  Oral = 0,
  // 肌注
  Injection = 1,
  // 外敷
  External = 2,
  // 雾化
  Inhalation = 3,
}

const columns: TableColumnProps<Partial<DrugData>>[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '使用方式',
    dataIndex: 'usage',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 200,
    render(col, item, index) {
      return (
        <>
          <Button type='text' size='small'>
            <IconEdit />
            编辑
          </Button>
          <Popconfirm
            title='你确定要删除吗'
            onOk={async () => {
              Message.success('删除成功');
            }}
          >
            <Button type='text' size='small' status='danger'>
              <IconDelete />
              删除
            </Button>
          </Popconfirm>
        </>
      );
    },
  },
];

const postDrugRequest = (data: DrugData) =>
  request<null>({
    method: 'POST',
    url: apisConfig.routes.drug,
    data,
  });

const index = () => {
  return (
    <>
      <Head>
        <title>药物数据管理</title>
      </Head>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        药物数据管理
      </div>
      <ProTable
        columns={columns}
        request={async () => ({ total: 2, data: [] })}
      />
    </>
  );
};

export default index;
