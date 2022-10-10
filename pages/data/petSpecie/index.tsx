import React from 'react';
import ProTable from '../../../components/ProTable';

const columns = [
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
];

const index = () => {
  return (
    <>
      <ProTable
        columns={columns}
        request={async ({ currentPage }) => {
          return {
            total: 20,
            data: [
              {
                name: currentPage,
                usage: 5,
                description: 'lorem',
              },
              {
                name: currentPage,
                usage: 5,
                description: 'lorem',
              },
              {
                name: currentPage,
                usage: 5,
                description: 'lorem',
              },
            ],
          };
        }}
      />
    </>
  );
};

export default index;
