import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  Message,
} from '@arco-design/web-react';
import useAuth from '../../../hooks/useAuth';

const index = () => {
  const [loginFormInstance] = Form.useForm();
  const { signIn, isLoginLoading } = useAuth();

  return (
    <Card
      style={{ width: 500, margin: 'auto' }}
      bordered={false}
      title={<strong>用户登录</strong>}
    >
      <Spin loading={isLoginLoading} style={{ width: '100%' }}>
        <Form
          form={loginFormInstance}
          onSubmit={(value) => {
            signIn && signIn(value);
          }}
          layout='vertical'
          requiredSymbol={false}
          validateMessages={{
            required: (_: any, { label }: { label: string }) =>
              `请填写${label}`,
          }}
        >
          <Form.Item
            field='userName'
            label='用户名'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
            // prefix={<IconUser />}
            //  placeholder='用户名'
            />
          </Form.Item>
          <Form.Item
            field='password'
            label='密码'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
            // prefix={<IconLock />}
            // placeholder='密码'
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default index;
