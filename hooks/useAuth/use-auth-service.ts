import { useEffect, useState } from 'react';
import { Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';

import { apisConfig } from '../../config';
import request from '../../services/request';
import { AuthEnum, type LoginData } from './types';
import { parseToken } from './utils';
import { useRouter } from 'next/router';
import { message } from 'antd';

const loginRequest = (data: LoginData) => {
  return request<string>({
    method: 'POST',
    url: apisConfig.routes.login,
    data,
  });
};

const redirectIgnoreRouteList = ['/user/register'];

const useAuthService = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const { run: login, loading: isLoginLoading } = useRequest(loginRequest, {
    manual: true,
    onSuccess(data, params) {
      if (data.success) {
        Message.success('登录成功');
        setUser(parseToken(data.data as string));
        console.log({ user });
        setIsAuthorized(true);
        localStorage.setItem(AuthEnum.TokenName, data.data as string);
        router.push('/');
      } else {
        Message.error('登录失败');
        console.warn({ data, params });
      }
    },
    onError(error, params) {
      Message.error('登录失败');
      console.warn({ error, params });
    },
  });

  useEffect(() => {
    if (redirectIgnoreRouteList.includes(router.route)) {
      return;
    }
    if (
      localStorage.getItem(AuthEnum.TokenName) &&
      parseToken(localStorage.getItem(AuthEnum.TokenName))
    ) {
      debugger;
      const { exp } = parseToken(localStorage.getItem(AuthEnum.TokenName));
      if (exp && exp * 10e3 <= Date.now()) {
        router.push('/user/login');
        Message.info('登录过期，请重新登录');
      } else {
        setIsAuthorized(true);
        setUser(parseToken(localStorage.getItem(AuthEnum.TokenName)));
      }
    } else {
      router.push('/user/login');
    }
  }, []);

  const signIn = (data: LoginData) => {
    login(data);
  };

  const signOut = async () => {
    await localStorage.removeItem(AuthEnum.TokenName);
    message.success('登出成功！');
    router.push('/user/login');
  };

  return {
    user,
    isAuthorized,
    signIn,
    signOut,
    isLoginLoading,
  };
};

export default useAuthService;
