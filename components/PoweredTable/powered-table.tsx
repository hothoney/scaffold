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
import ExportDataButton from '../ExportDataButton';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import axios from 'axios';
import { apisConfig } from '../../config';

interface PoweredTableProps<T> extends ProTableProps<T, any> {
  api: string;
  pageListApi: string;
  readonly?: boolean;
}

const PoweredTable = <T,>({
  columns,
  api,
  pageListApi,
  readonly,
  ...restProps
}: PoweredTableProps<T>) => {
  const actionRef: React.Ref<ActionType> = React.useRef(null);

  const extraColumn: ProColumns<T, 'text'>[] = readonly
    ? []
    : [
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
      form={{
        layout: 'vertical',
      }}
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
        readonly && (
          <CreateDataButton<T>
            columns={columns as ProColumns<T, 'text'>[]}
            onSubmit={async (data) => {
              const response = await request({
                url: api,
                method: 'POST',
                data,
              });
              if (response.success) {
                message.success('新建数据成功！');
                actionRef.current?.reload();
              } else {
                message.error('新建数据失败！');
              }
              return response.success;
            }}
          />
        ),
        <ExportDataButton
          onExport={async () => {
            request({
              url: api + '/Export',
              method: 'POST',
              responseType: 'arraybuffer',
              data: {
                pageSize: 9999,
                pageIndex: 1,
                conditions: [],
              },
            }).then((res) => {
              // 假设 data 是返回来的二进制数据
              saveAs(
                new Blob([res as unknown as ArrayBuffer], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }),
                `${api.split('/')[api.split('/').length - 1]}_${dayjs().format(
                  'YYYY_MM_DD'
                )}.xlsx`
              );
              // const data = res.data;
              // const url = window.URL.createObjectURL(

              // );
              // const link = document.createElement('a');
              // link.style.display = 'none';
              // link.href = url;
              // link.setAttribute('download', 'excel.xlsx');
              // document.body.appendChild(link);
              // link.click();
              // document.body.removeChild(link);
            });
          }}
        />,
      ]}
    />
  );
};

export default PoweredTable;
