import axios, { AxiosRequestConfig } from 'axios';
import { apisConfig } from '../../config';
import { AuthEnum } from '../../hooks/useAuth/types';

interface BaseResponseType<T> {
  success: boolean;
  msg: string;
  data: T;
}

const instance = axios.create({
  baseURL: apisConfig.baseUrl,
});

instance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      // ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(AuthEnum.TokenName)}`,
    },
  };
});

const request = <T>(config: AxiosRequestConfig) => {
  return instance.request<BaseResponseType<T>>(config);
};

export default request;
