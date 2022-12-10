import { ProColumns } from '@ant-design/pro-components';
import { apisConfig } from '../../config';
import request from '../../services/request';
import PoweredTable from '../../components/PoweredTable';
interface UserRecordData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  userName: string;
  realName: string;
  userType: number;
}


const columns: ProColumns<Partial<UserRecordData>, 'text'>[] = [
  {
    title: '用户名',
    dataIndex: 'userName',    
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    valueType: 'select',
    valueEnum: {
      0: '工作人员',
      1: '药品供应商',
      2: '客户',
      99:'超管'
    },
  },

];

const user = () => {
  return (
    <>
      <PoweredTable<Partial<UserRecordData>>
        debounceTime={300}
        columns={columns}
        api={apisConfig.routes.user}
        pageListApi={apisConfig.routes.userList}
      // readonly
      />
    </>
  );
};

export default user;
