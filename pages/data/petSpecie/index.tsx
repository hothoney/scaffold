import React from 'react';
import { apisConfig } from '../../../config';
import PoweredTable from '../../../components/PoweredTable';
import { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns<unknown, 'text'>[] = [
  {
    key: 'name',
    title: '名称',
    dataIndex: 'name',
  },
  {
    key: 'description',
    title: '使用方式',
    dataIndex: 'description',
    valueType: 'select',
    valueEnum: {
      0: '口服',
      1: '肌注',
      2: '外敷',
      3: '雾化',
    },
  },
  {
    key: 'description',
    title: '描述',
    dataIndex: 'description',
  },
];

const index = () => {
  return (
    <>
      <PoweredTable
        columns={columns}
        api={apisConfig.routes.petSpecie}
        pageListApi={apisConfig.routes.petSpecieList}
      />
    </>
  );
};

export default index;
