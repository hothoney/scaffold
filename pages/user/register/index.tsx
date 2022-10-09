import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  Message,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import request from '../../../services/request';
import { apisConfig } from '../../../config';
import Head from 'next/head';

interface RegisterData {
  passWord: string;
  userName: string;
  realName: string;
  userType: number;
}

const postRegisterValue = (data: RegisterData) => {
  return request<null>({
    method: 'POST',
    data,
    url: apisConfig.routes.register,
  });
};

import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const MotionFormItem = motion(Form.Item);

const containerVariants: Variants = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      staggerChildren: 0.2,
      duration: 0.2,
    },
  },
  hide: {
    y: -50,
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.2,
    },
  },
};
const itemVariants: Variants = {
  show: {
    x: 0,
    opacity: 1,
  },
  hide: {
    x: -50,
    opacity: 0,
  },
};

const index = () => {
  const router = useRouter();
  const [registerFormInstance] = Form.useForm();
  const {
    data: registerResult,
    loading: isRegisterLoading,
    run: register,
  } = useRequest(postRegisterValue, {
    manual: true,
    onSuccess(data, params) {
      if (data.data.success) {
        Message.success('注册成功');
        router.push('/user/login');
      } else {
        Message.error('注册失败');
        console.warn('注册失败错误:', { data, params });
      }
    },
    onError(e, params) {
      Message.error('注册失败');
      console.warn('注册失败错误:', { e, params });
    },
  });

  return (
    <>
      <Head>
        <title>用户注册</title>
      </Head>
      <motion.div
        variants={containerVariants}
        style={{ width: 500, margin: 'auto' }}
        initial='hide'
        animate='show'
        exit='hide'
      >
        <Card bordered={false} title={<strong>用户注册</strong>}>
          <Spin loading={isRegisterLoading} style={{ width: '100%' }}>
            <Form
              form={registerFormInstance}
              onSubmit={(value) => {
                register(value);
              }}
              layout='vertical'
              requiredSymbol={false}
              validateMessages={{
                required: (_: any, { label }: { label: string }) =>
                  `请填写${label}`,
              }}
            >
              <MotionFormItem
                hasFeedback
                key='username'
                variants={itemVariants}
                field='userName'
                label='用户名'
                rules={[
                  {
                    required: true,
                    validator: async (value, callback) => {
                      const regExp =
                        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

                      if (regExp.test(value as string)) {
                        return callback(null);
                      } else {
                        return callback('请输入正确的邮箱');
                      }
                    },
                  },
                ]}
              >
                <Input />
              </MotionFormItem>
              <MotionFormItem
                hasFeedback
                key='realName'
                variants={itemVariants}
                field='realName'
                label='真实姓名'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </MotionFormItem>
              <MotionFormItem
                hasFeedback
                key='password'
                variants={itemVariants}
                field='password'
                label='密码'
                rules={[
                  {
                    minLength: 6,
                    maxLength: 12,
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </MotionFormItem>
              <MotionFormItem
                hasFeedback
                variants={itemVariants}
                field='confirmPassword'
                dependencies={['password']}
                rules={[
                  {
                    minLength: 6,
                    maxLength: 12,
                    required: true,
                  },
                  {
                    validator: async (confirmPasswordValue, cb) => {
                      if (
                        confirmPasswordValue !==
                        registerFormInstance.getFieldValue('password')
                      ) {
                        return cb('两次输入的密码不匹配');
                      } else {
                        return cb(null);
                      }
                    },
                  },
                ]}
                label='确认密码'
              >
                <Input.Password />
              </MotionFormItem>
              <MotionFormItem variants={itemVariants} key='submitBtn'>
                <Button htmlType='submit' type='primary'>
                  注册
                </Button>
              </MotionFormItem>
            </Form>
          </Spin>
        </Card>
      </motion.div>
    </>
  );
};

export default index;
