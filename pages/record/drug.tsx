import { TableColumnProps } from '@arco-design/web-react';
import React from 'react';
import ProTable from '../../components/ProTable';
import { apisConfig } from '../../config';
import request from '../../services/request';

interface DrugRecordData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  sponsor: number;
  implementer: number;
  beneficiary: number;
  phone: string;
  beneficiaryCertificate: string;
  drugId: number;
  count: number;
  operatingType: number;
  status: number;
}

const columns: TableColumnProps<DrugRecordData>[] = [
  {
    title: '发起者',
    dataIndex: 'sponsor',
  },
  {
    title: '实施者',
    dataIndex: 'implementer',
  },
  {
    title: '药品厂商/宠物主人',
    dataIndex: 'beneficiary',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
  },
  {
    title: '药品厂商/宠物主人证件',
    dataIndex: 'beneficiaryCertificate',
  },
  {
    title: '该次药品记录数量',
    dataIndex: 'count',
  },
  {
    title: '操作类型',
    dataIndex: 'operatingType',
  },
  {
    title: '完成情况',
    dataIndex: 'status',
  },
];

const drug = () => {
  return (
    <>
      <ProTable<Partial<DrugRecordData>>
        columns={columns}
        request={async ({ currentPage, pageSize, ...params }) => {
          try {
            const result = await request<DrugRecordData[]>({
              method: 'POST',
              url: apisConfig.routes.drugRecordList,
              data: {
                conditions: Object.entries(params)
                  .map(([key, value]) => {
                    return {
                      name: key,
                      value,
                      conditionType: 1,
                    };
                  })
                  .filter((condition) => condition.value),
                pageIndex: currentPage,
                pageSize,
              },
            });
            if (result.data) {
              return {
                total: result.data.totalCount || 0,
                data: result.data.data || [],
              };
            } else {
              return {
                total: 0,
                data: [],
              };
            }
          } catch (error) {
            return {
              total: 0,
              data: [],
            };
          }
        }}
        addRequest={async (data) => {
          try {
            const result = await request({
              method: 'POST',
              url: apisConfig.routes.drugRecord,
              data,
            });
            if (result.data.success) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }}
      />
    </>
  );
};

export default drug;
