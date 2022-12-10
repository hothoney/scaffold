import { TableColumnProps } from '@arco-design/web-react';
import React from 'react';
import ProTable from '../../components/ProTable';
import { apisConfig } from '../../config';
import request from '../../services/request';

interface FosterRecordData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  userId: number;
  name: string;
  phoneNumber: string;
  certificate: string;
  petId: number;
  fosterDateTime: Date;
  status: number;
  receiveImplementer: number;
  transferImplementer: number;
}

const columns: TableColumnProps<FosterRecordData>[] = [
  {
    title: '领养人',
    dataIndex: 'name',
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
  },
  {
    title: '证件',
    dataIndex: 'certificate',
  },
  {
    title: '宠物 id',
    dataIndex: 'petId',
  },
  {
    title: '寄养时间',
    dataIndex: 'fosterDateTime',
  },
  {
    title: '接收到医院实施者',
    dataIndex: 'receiveImplementer',
  },
  {
    title: '从医院送出实施者',
    dataIndex: 'transferImplementer',
  },
];

const drug = () => {
  return (
    <>
      <ProTable<Partial<FosterRecordData>>
        columns={columns}
        request={async ({ currentPage, pageSize, ...params }) => {
          try {
            return {
              total: 4,
              data: [],
            };
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
            if (result.success) {
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
