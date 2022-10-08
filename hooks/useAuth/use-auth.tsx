import { Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import React, { type ReactNode, useContext, useState, useEffect } from 'react';
import { apisConfig } from '../../config';
import request from '../../services/request';

enum AuthEnum {
  TokenName = 'token',
}
interface AuthProviderProps {
  children: ReactNode;
}

interface LoginData {
  passWord: string;
  userName: string;
}

const loginRequest = (data: LoginData) => {
  return request<string>({
    method: 'POST',
    url: apisConfig.routes.login,
    data,
  });
};

const parseToken = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    JSON.parse(window.atob(token));
    return JSON.parse(window.atob(token));
  } catch (error) {
    console.warn('parse token failed');
    return false;
  }
};

const AuthContext = React.createContext<
  Partial<{
    user: any;
    isAuthorized: boolean;
    signIn: (data: LoginData) => void;
    signOut: () => void;
    isLoginLoading: boolean;
  }>
>({});

const useAuthService = () => {
  const [user, setUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const { run: login, loading: isLoginLoading } = useRequest(loginRequest, {
    manual: true,
    onSuccess(data, params) {
      if (data.data.success) {
        Message.success('登录成功');
        setUser(parseToken(data.data.data || null));
        setIsAuthorized(true);
        localStorage.setItem(AuthEnum.TokenName, data.data.data || '');
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

  const signIn = (data: LoginData) => {
    login(data);
  };

  const signOut = () => {
    localStorage.removeItem(AuthEnum.TokenName);
  };

  return {
    user,
    isAuthorized,
    signIn,
    signOut,
    isLoginLoading,
  };
};

const useAuth = () => useContext(AuthContext);

const redirectIgnoreRouteList = ['/user/register'];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirectIgnoreRouteList.includes(router.route)) {
      return;
    }
    if (
      localStorage.getItem(AuthEnum.TokenName) &&
      parseToken(localStorage.getItem(AuthEnum.TokenName))
    ) {
      const { exp } = parseToken(localStorage.getItem(AuthEnum.TokenName));
      if (exp && exp <= Date.now()) {
        router.push('/user/login');
        Message.info('登录过期，请重新登录');
      }
    } else {
      router.push('/user/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={useAuthService()}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
