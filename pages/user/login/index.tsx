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
import Head from 'next/head';
import { motion, type Variants, AnimatePresence } from 'framer-motion';

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
  const [loginFormInstance] = Form.useForm();
  const { signIn, isLoginLoading } = useAuth();

  return (
    <>
      <Head>
        <title>用户登录</title>
      </Head>
      <motion.div
        initial='hide'
        animate='show'
        exit='hide'
        variants={containerVariants}
        style={{ width: 500, margin: 'auto' }}
      >
        <Card bordered={false} title={<strong>用户登录</strong>}>
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
              <AnimatePresence>
                <MotionFormItem
                  variants={itemVariants}
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
                </MotionFormItem>
                <MotionFormItem
                  variants={itemVariants}
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
                </MotionFormItem>
                <MotionFormItem variants={itemVariants}>
                  <Button htmlType='submit' type='primary'>
                    登录
                  </Button>
                </MotionFormItem>
              </AnimatePresence>
            </Form>
          </Spin>
        </Card>
      </motion.div>
    </>
  );
};

export default index;
