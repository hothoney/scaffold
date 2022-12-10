import React, { useState } from 'react';

import TableFilter from '../TableFilter';
import {
  Divider,
  Message,
  Table,
  type TableColumnProps,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import CreateDataButton from '../CreateDataButton';

interface ProTableProps<T> {
  columns: TableColumnProps[];
  request: (
    params: T & {
      currentPage: number;
      pageSize: number;
    }
  ) => Promise<{ total: number; data: T[] }>;
  addRequest?: (values: T) => Promise<boolean> | boolean;
}

const ProTable = <T,>({ request, columns, addRequest }: ProTableProps<T>) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formParams, setFormParams] = useState<Record<string, any>>({});
  const {
    data: requestResult,
    refresh,
    loading,
  } = useRequest(
    () =>
      request({ currentPage, pageSize, ...formParams } as unknown as T & {
        currentPage: number;
        pageSize: number;
      }),
    {
      refreshDeps: [currentPage, formParams, pageSize],
    }
  );

  return (
    <>
      <TableFilter
        columns={columns}
        onSubmit={(value) => setFormParams(value)}
      />
      {/* <CreateDataButton
        columns={columns}
        onSubmit={async (values) => {
          if (!(addRequest && typeof addRequest === 'function')) {
            return false;
          } else {
            const result = await addRequest(values as T);
            if (result) {
              refresh();
            }
            return result;
          }
        }}
        onSuccess={() => Message.success('创建成功')}
        onError={() => Message.error('创建失败')}
      /> */}
      <Divider />
      <Table
        loading={loading}
        columns={columns}
        data={requestResult?.data || []}
        pagination={{
          total: requestResult?.total || 0,
          current: currentPage,
          onChange(pageNumber, pageSize) {
            setCurrentPage(pageNumber);
            setPageSize(pageSize);
          },
        }}
      />
    </>
  );
};

export default ProTable;
