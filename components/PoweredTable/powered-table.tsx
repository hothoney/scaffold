import React from 'react';
import {
  ActionType,
  ProColumns,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import CreateDataButton from '../CreateDataButton';
import request from '../../services/request';
import formatParams2Conditions from '../../utils/formatParams2Conditions';
import { message, Space } from 'antd';
import DeleteDataButton from '../DeleteDataButton/delete-data-button';
import EditDataButton from '../EditDataButton';

interface PoweredTableProps<T> extends ProTableProps<T, any> {
  api: string;
  pageListApi: string;
}

const PoweredTable = <T,>({
  columns,
  api,
  pageListApi,
  ...restProps
}: PoweredTableProps<T>) => {
  const actionRef: React.Ref<ActionType> = React.useRef(null);

  const extraColumn: ProColumns<T, 'text'>[] = [
    {
      key: 'edit',
      title: '操作',
      width: 120,
      renderText(_, record: any) {
        return (
          <Space>
            <EditDataButton
              initialData={record}
              columns={columns as ProColumns<T, 'text'>[]}
              onSubmit={async (data) => {
                const response = await request({
                  url: api,
                  method: 'PUT',
                  data: {
                    ...data,
                    id: record.id,
                  },
                });
                if (response.success) {
                  message.success('更新成功');
                  actionRef.current?.reload();
                }
                return response.success;
              }}
            />
            <DeleteDataButton
              onDelete={async () => {
                const response = await request({
                  url: api,
                  method: 'DELETE',
                  params: {
                    id: record.id,
                  },
                });
                if (response.success) {
                  message.success('删除成功');
                  actionRef.current?.reload();
                }
                return response.success;
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable<T>
      {...restProps}
      rowKey='id'
      columns={[...(columns as ProColumns<T, 'text'>[]), ...extraColumn]}
      actionRef={actionRef}
      request={async ({
        current: pageIndex,
        pageSize: pageSize,
        keyword,
        ...restParams
      }) => {
        const conditions = formatParams2Conditions(restParams);
        const response = await request<T[]>({
          url: pageListApi,
          method: 'POST',
          data: {
            pageIndex,
            pageSize,
            conditions,
          },
        });
        return {
          total: response.totalCount,
          success: response.success,
          data: response.data,
        };
      }}
      toolBarRender={() => [
        <CreateDataButton<T>
          columns={columns as ProColumns<T, 'text'>[]}
          onSubmit={async (data) => {
            const response = await request({
              url: api,
              method: 'POST',
              data,
            });
            if (response.success) {
              actionRef.current?.reload();
            }
            return response.success;
          }}
          onSuccess={() => {
            message.success('新建数据成功！');
          }}
          onError={() => {
            message.error('新建数据失败！');
          }}
        />,
      ]}
    />
  );
};

export default PoweredTable;
