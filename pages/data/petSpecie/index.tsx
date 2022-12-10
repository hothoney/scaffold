import React from 'react';
import { apisConfig } from '../../../config';
import PoweredTable from '../../../components/PoweredTable';

const columns = [
  {
    key: 'name',
    title: '名称',
    dataIndex: 'name',
  },
  {
    key: 'usage',
    title: '使用方式',
    dataIndex: 'usage',
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
