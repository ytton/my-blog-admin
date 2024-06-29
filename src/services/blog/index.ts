import { genAxiosInstance, ListRes, QueryList } from '@/utils/http/index';

const http = genAxiosInstance();

export type Blog = {
  id: string;
  cover: string;
  title: string;
  cate: string;
  author: string;
  allowComment: boolean;
  status: number;
  createAt: string;
  updateAt: string;
};

export function getBlogList(params: QueryList<Blog>) {
  return http.get<ListRes<Blog>>('blogs', { params });
}
