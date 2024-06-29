import { genAxiosInstance, ListRes, QueryList } from '@/utils/http/index';

const http = genAxiosInstance({ baseURL: '/api/blog' }, true);

export type Blog = {
  id: string;
  cover: string;
  title: string;
  cate: string;
  author: string;
  allowComment: boolean;
  createAt: string;
  updateAt: string;
};

export async function getBlogList(params: QueryList<Blog>) {
  const res = await http.get<ListRes<Blog>>('login', { params });
  res;
}
