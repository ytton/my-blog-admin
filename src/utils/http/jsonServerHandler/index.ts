import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const reqQueryMap: Record<string, string> = {
  page: '_page',
  pageSize: '_per_page'
};
export const handleRequest = (config: InternalAxiosRequestConfig<any>) => {
  if (config.method === 'get' && config.params) {
    Object.keys(config.params).forEach(key => {
      if (reqQueryMap[key] === undefined) {
        return;
      }
      config.params[reqQueryMap[key]] = config.params[key];
      delete config.params[key];
    });
  }
};
export const handleResponse = (res: AxiosResponse<any, any>) => {
  if (res && res.headers['x-total-count'] !== undefined) {
    res.data = {
      total: res.headers['x-total-count'] * 1,
      data: res.data
    };
  }
};
