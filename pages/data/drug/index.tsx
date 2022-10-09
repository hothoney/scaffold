import {
  Table,
  type TableColumnProps,
  Form,
  Input,
  Radio,
  type FormInstance,
  Button,
} from '@arco-design/web-react';
import request from '../../../services/request';
import { apisConfig } from '../../../config';
import Head from 'next/head';
import CreateDataButton from '../../../components/CreateDataButton';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';

interface DrugData {
  id: number;
  modified: Date;
  modifiedBy: number;
  deleted: boolean;
  created: Date;
  createdBy: number;
  name: string;
  usage: number;
  description: string;
}

enum UsageEnum {
  // 口服
  Oral = 0,
  // 肌注
  Injection = 1,
  // 外敷
  External = 2,
  // 雾化
  Inhalation = 3,
}

const columns: TableColumnProps<Partial<DrugData>>[] = [
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
  {
    title: '操作',
    fixed: 'right',
    width: 200,
    render(col, item, index) {
      return (
        <>
          <Button type='text' size='small'>
            <IconEdit />
            编辑
          </Button>
          <Button type='text' size='small' status='danger'>
            <IconDelete />
            删除
          </Button>
        </>
      );
    },
  },
];

const FormComponent = (
  form: FormInstance,
  doRequest: (...args: any[]) => void
) => (
  <Form
    layout='vertical'
    form={form}
    onSubmit={(value) => {
      doRequest(value);
    }}
  >
    <Form.Item field='name' label='名称' rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item field='usage' label='使用方式' rules={[{ required: true }]}>
      <Radio.Group>
        {Object.keys(UsageEnum)
          .filter((usage) => isNaN(Number(usage)))
          .map((usage) => (
            <Radio value={(UsageEnum as any)[usage]} key={usage}>
              {usage}
            </Radio>
          ))}
      </Radio.Group>
    </Form.Item>
    <Form.Item field='description' label='描述' rules={[{ required: true }]}>
      <Input.TextArea />
    </Form.Item>
  </Form>
);

const postDrugRequest = (data: DrugData) =>
  request<null>({
    method: 'POST',
    url: apisConfig.routes.drug,
    data,
  });

const index = () => {
  return (
    <>
      <Head>
        <title>药物数据管理</title>
      </Head>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        药物数据管理
      </div>
      <CreateDataButton
        postRequest={postDrugRequest}
        renderForm={FormComponent}
      />
      <Table
        columns={columns}
        data={[
          {
            name: '123',
            usage: 0,
            description: '123',
          },
          {
            name: '123',
            usage: 0,
            description: '123',
          },
        ]}
      />
    </>
  );
};

export default index;
