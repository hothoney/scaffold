import axios, { AxiosRequestConfig } from 'axios';
import { apisConfig } from '../../config';

interface BaseResponseType<T> {
  success: boolean;
  msg: string;
  data: T;
}

const instance = axios.create({
  baseURL: apisConfig.baseUrl,
});

const request = <T>(config: AxiosRequestConfig) => {
  return instance.request<BaseResponseType<T>>(config);
};

export default request;
