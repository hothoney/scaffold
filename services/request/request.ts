import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apisConfig } from '../../config';
import { AuthEnum } from '../../hooks/useAuth/types';

interface BaseResponseType<T> {
  success: boolean;
  msg: string;
  data?: T;
  pageSize?: number;
  totalCount?: number;
  pageIndex?: number;
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

const request = async <T>(
  config: AxiosRequestConfig
): Promise<BaseResponseType<T>> => {
  const result = (await instance.request<BaseResponseType<T>>(config)).data;
  return result;
};

export default request;
