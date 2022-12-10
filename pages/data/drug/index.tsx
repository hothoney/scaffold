import { Button, Popconfirm, Message } from '@arco-design/web-react';
import { apisConfig } from '../../../config';
import Head from 'next/head';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import PoweredTable from '../../../components/PoweredTable';
import { ProColumns } from '@ant-design/pro-components';

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

const columns: ProColumns[] = [
  {
    key: 'name',
    title: '名称',
    dataIndex: 'name',
  },
  {
    key: 'usage',
    title: '使用方式',
    dataIndex: 'usage',
    valueType: 'select',
    valueEnum: {
      0: '口服',
      1: '肌注',
      2: '外敷',
      3: '雾化',
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

const index = () => {
  return (
    <>
      <Head>
        <title>药物数据管理</title>
      </Head>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        药物数据管理
      </div>
      <PoweredTable
        columns={columns}
        api={apisConfig.routes.drug}
        pageListApi={apisConfig.routes.drugList}
      />
    </>
  );
};

export default index;
