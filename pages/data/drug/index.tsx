import React, { useState } from 'react';
import {
  Button,
  Table,
  Modal,
  type TableColumnProps,
  Form,
  Input,
  Radio,
  Message,
  Typography,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import axios from 'axios';
import request from '../../../services/request';
import { apisConfig } from '../../../config';
import Head from 'next/head';
import { IconPlus } from '@arco-design/web-react/icon';

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

const columns: TableColumnProps<DrugData>[] = [
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
  },
];

const postDrugRequest = (data: DrugData) =>
  request<null>({
    method: 'POST',
    url: apisConfig.routes.drug,
    data,
  });

const index = () => {
  const [isNewModalVisible, setIsNewModalVisible] = useState<boolean>(false);
  const { run: postDrug } = useRequest(postDrugRequest, {
    manual: true,
    onSuccess(data, params) {
      if (data.data.success) {
        Message.success('新建成功');
      } else {
        Message.error('新建数据失败');
      }
    },
    onError(e, params) {
      Message.error('新建数据失败');
    },
  });
  const [drugFormInstance] = Form.useForm();

  return (
    <>
      <Head>
        <title>药物数据管理</title>
      </Head>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        药物数据管理
      </div>
      <Modal
        title='新建数据'
        visible={isNewModalVisible}
        onCancel={() => setIsNewModalVisible(false)}
        onOk={() => drugFormInstance.submit()}
      >
        <Form
          layout='vertical'
          form={drugFormInstance}
          onSubmit={(value) => {
            postDrug(value);
          }}
        >
          <Form.Item field='name' label='名称' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            field='usage'
            label='使用方式'
            rules={[{ required: true }]}
          >
            <Radio.Group>
              {Object.keys(UsageEnum)
                .filter((usage) => isNaN(Number(usage)))
                .map((usage) => (
                  <Radio value={UsageEnum[usage]} key={usage}>
                    {usage}
                  </Radio>
                ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            field='description'
            label='描述'
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type='primary'
        onClick={() => setIsNewModalVisible(true)}
        style={{ marginBottom: 10 }}
      >
        <IconPlus />
        新建
      </Button>
      <Table columns={columns} />
    </>
  );
};

export default index;
