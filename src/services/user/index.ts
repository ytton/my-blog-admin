import { CommonRes, genAxiosInstance } from '@/utils/http/index';

const http = genAxiosInstance({ baseURL: '/api/' });

type LoginParams = {
  account: string;
  password: string;
  checkCode: string;
};

type LoginResponse = CommonRes<{
  userId: number;
  nickName: string;
  avatar: string;
  roleType: number;
}>;

export function login(params: LoginParams) {
  return http.get<LoginResponse>('login', { params });
}
