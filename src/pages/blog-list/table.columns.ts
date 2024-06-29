import { Blog } from '@/services/blog';
import { ColumnProps } from 'ant-design-vue/es/table';
import { h } from 'vue';

export const columns: ColumnProps<Blog>[] = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '分类',
    dataIndex: 'cate',
    key: 'cate'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '评论',
    dataIndex: 'allowComment',
    key: 'allowComment'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '时间',
    key: 'time',
    customRender: ({ record }) => h('div', [`创建时间：${record.createAt}`, h('br'), `更新时间：${record.updateAt}`])
  },
  {
    key: 'action',
    title: '操作'
  }
];
