import React from 'react';
import { apisConfig } from '../../../config';
import PoweredTable from '../../../components/PoweredTable';
import { ProColumns } from '@ant-design/pro-components';
import Head from 'next/head';

const columns: ProColumns<unknown, 'text'>[] = [
  {
    key: 'name',
    title: '名称',
    dataIndex: 'name',
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
      <Head>
        <title>宠物物种维护</title>
      </Head>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        宠物物种维护
      </div>
      <PoweredTable
        columns={columns}
        api={apisConfig.routes.petSpecie}
        pageListApi={apisConfig.routes.petSpecieList}
      />
    </>
  );
};

export default index;
