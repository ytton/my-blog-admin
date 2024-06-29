import { message } from 'ant-design-vue';
import axios, {
  Axios,
  AxiosDefaults,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  HeadersDefaults
} from 'axios';
import { handleRequest, handleResponse } from './jsonServerHandler';

type InterceptorOptions = {
  showMessage?: boolean;
  needResponse?: boolean;
};

const handleInterceptors = (
  service: AxiosInstance,
  { showMessage = true, needResponse = false }: InterceptorOptions = {}
) => {
  service.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      handleRequest(config);
      return config;
    },
    error => {
      // 对请求错误做些什么
      showMessage && message.error('Request error: ', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      //解决某些api无论失败还是成功 都是200，但会把状态码套在data里
      const data = response.data;

      if (data.status && data.status === 'error') {
        if (data.code === 401) {
          // 未授权
          showMessage && message.error('Unauthorized access!');
        } else if (data.code === 404) {
          // 未找到
          showMessage && message.error('Resource not found.');
        } else if (data.code === 500) {
          // 服务器内部错误
          showMessage && message.error('Server internal error.');
        } else if (data.code === 503) {
          // 服务不可用
          showMessage && message.error('Service unavailable.');
        } else {
          // 其他错误
          showMessage && message.error(data.message ?? data.info ?? '未知异常');
        }
        return Promise.reject(response);
      }
      // 对响应数据做些什么
      handleResponse(response);
      const returnData = needResponse ? response : response.data;
      return returnData;
    },
    error => {
      // 对响应错误做些什么
      if (error.response) {
        // 客户端没有收到响应，或者响应的状态码在400-499之间
        if (error.response.status === 401) {
          // 未授权
          showMessage && message.error('Unauthorized access!');
        } else if (error.response.status === 404) {
          // 未找到
          showMessage && message.error('Resource not found.');
        } else if (error.response.status === 500) {
          // 服务器内部错误
          showMessage && message.error('Server internal error.');
        } else if (error.response.status === 503) {
          // 服务不可用
          showMessage && message.error('Service unavailable.');
        } else {
          // 其他错误
          showMessage && message.error('Other error: ', error.response.status);
        }
      } else if (error.request) {
        // 请求已经发出，但是没有收到响应
        // 可能是网络问题
        showMessage && message.error('Network Error: ', error.request);
      } else {
        // 请求发出后，在等待响应时发生了错误
        showMessage && message.error('Error: ', error.message);
      }
      // 对错误进行统一处理
      return Promise.reject(error);
    }
  );
};

type CreateInstanceConfig = CreateAxiosDefaults & {
  message?: boolean;
  needResponse?: boolean;
};

interface NewAxiosInstance extends Axios {
  <T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  <T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
  request<T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export function genAxiosInstance(): NewAxiosInstance;
export function genAxiosInstance(config: CreateInstanceConfig): NewAxiosInstance;
export function genAxiosInstance(config: CreateInstanceConfig, needResponse: boolean): AxiosInstance;
export function genAxiosInstance(
  { message = true, baseURL = '/api', timeout = 5000, ...config }: CreateInstanceConfig = {},
  needResponse = false
) {
  const inst = axios.create({ baseURL, timeout, ...config });
  handleInterceptors(inst, { showMessage: message });

  if (needResponse) return inst;
  return inst as NewAxiosInstance;
}

export default genAxiosInstance({});

export type CommonRes<T> = T;

export type QueryList<Data> = {
  page: number;
  pageSize: number;
  orderBy?: keyof Data;
  order?: 'asc' | 'desc';
} & {
  [Key in keyof Data]?: Data[Key] | string | number;
};

export type ListRes<T> = CommonRes<{
  total: 0;
  data: T[];
}>;
