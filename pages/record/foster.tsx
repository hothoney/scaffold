import { TableColumnProps } from '@arco-design/web-react';
import React from 'react';
import {
  ProColumns,
  ProColumnType,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { apisConfig } from '../../config';
import request from '../../services/request';
import formatParams2Conditions, {
  ConditionTypeEnum,
} from '../../utils/formatParams2Conditions';
import PoweredTable from '../../components/PoweredTable';

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

const columns: ProColumns<Partial<FosterRecordData>, 'text'>[] = [
  {
    title: '领养人',
    dataIndex: 'userId',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          userName: string;
          realName: string;
          passWord: string;
          userType: number;
          id: number;
          modified: Date;
          modifiedBy: number;
          deleted: boolean;
          created: Date;
          createdBy: number;
        }[]
      >({
        url: '/api/User/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.userName,
          value: user.id,
        })) || []
      );
    },
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
    valueType: 'date',
  },
  {
    title: '接收到医院实施者',
    dataIndex: 'receiveImplementer',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          userName: string;
          realName: string;
          passWord: string;
          userType: number;
          id: number;
          modified: Date;
          modifiedBy: number;
          deleted: boolean;
          created: Date;
          createdBy: number;
        }[]
      >({
        url: '/api/User/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.userName,
          value: user.id,
        })) || []
      );
    },
  },
  {
    title: '从医院送出实施者',
    dataIndex: 'transferImplementer',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      filterOption: (input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes(input.toLowerCase()),
    },
    request: async () => {
      const response = await request<
        {
          userName: string;
          realName: string;
          passWord: string;
          userType: number;
          id: number;
          modified: Date;
          modifiedBy: number;
          deleted: boolean;
          created: Date;
          createdBy: number;
        }[]
      >({
        url: '/api/User/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.userName,
          value: user.id,
        })) || []
      );
    },
  },
];

const drug = () => {
  return (
    <>
      <PoweredTable<Partial<FosterRecordData>>
        debounceTime={300}
        columns={columns}
        api={apisConfig.routes.Foster}
        pageListApi={apisConfig.routes.FosterList}
        readonly
      />
    </>
  );
};

export default drug;
