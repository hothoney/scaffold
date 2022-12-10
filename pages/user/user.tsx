import { ProColumns } from '@ant-design/pro-components';
import { apisConfig } from '../../config';
import request from '../../services/request';
import PoweredTable from '../../components/PoweredTable';
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


const columns: ProColumns<Partial<DrugRecordData>, 'text'>[] = [
  {
    title: '发起者',
    dataIndex: 'sponsor',
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
          label: user.realName,
          value: user.id,
        })) || []
      );
    },
  },
  {
    title: '实施者',
    dataIndex: 'implementer',
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
          label: user.realName,
          value: user.id,
        })) || []
      );
    },

  },
  {
    title: '药品厂商/宠物主人',
    dataIndex: 'beneficiary', valueType: 'select',
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
          label: user.realName,
          value: user.id,
        })) || []
      );
    },

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
    valueType: 'select',
    valueEnum: {
      0: '存入',
      1: '取出',
    },
  },
  {
    title: '完成情况',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: '完成',
      1: '失败',
      2: '超时',
    },
  },
  {
    title: '药品',
    dataIndex: 'drugId',
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
          name: string;
          id: number;
        }[]
      >({
        url: '/api/Drug/PageList',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 9999,
          conditions: [],
        },
      });
      return (
        response.data?.map((user) => ({
          label: user.name,
          value: user.id,
        })) || []
      );
    },
  },
];

const drug = () => {
  return (
    <>
      <PoweredTable<Partial<DrugRecordData>>
        debounceTime={300}
        columns={columns}
        api={apisConfig.routes.drugRecord}
        pageListApi={apisConfig.routes.drugRecordList}
      // readonly
      />
    </>
  );
};

export default drug;
