<template>
  <div class="flex flex-col h-full p-4 bg-gray-200">
    <div class="bg-white filter pt-[18px] px-[18px]">
      <Filter :formList="formList" v-model:value="formValues" @search="handleSearch" />
    </div>
    <div class="table bg-white mt-[18px] flex-1 min-h-0 p-[18px]">
      <a-space class="mb-2">
        <a-button type="primary" class="flex items-center" @click="createNewBlog">
          <PlusCircleOutlined />
          新增
        </a-button>
      </a-space>
      <a-table :columns="columns" :total="total" :loading="loading" :dataSource="tableData">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'status'">
            <span>
              <a-tag color="geekblue">
                {{ record.status }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span class="text-blue-400">
              <a>修改</a>
              <a-divider type="vertical" />
              <a>删除</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                预览
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
        ></a-table
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, h, computed } from 'vue';
import Filter from '@/components/Filter/Filter.vue';
import { columns } from './table.columns';
import { useRequest } from 'vue-hooks-plus';
import { getBlogList } from '@/services/blog';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const queryParams = reactive({
  page: 1,
  pageSize: 10,
  formData: {}
});
const { data, loading, runAsync } = useRequest(getBlogList, {
  initialData: {
    total: 0,
    data: []
  },
  defaultParams: [
    {
      page: queryParams.page,
      pageSize: queryParams.pageSize
    }
  ]
});
const tableData = computed(() => data.value?.data ?? []);
const total = computed(() => data.value?.total ?? 0);
console.log(loading);

const formList = ref([
  {
    input: 'a-input',
    inputProps: { placeholder: '请输入标题' },
    label: '标题',
    name: 'title',
    span: 8
  },
  {
    input: 'a-select',
    inputProps: {
      placeholder: '请选择状态',
      options: [{ label: '草稿', value: 3 }]
    },
    label: '状态',
    name: 'status',
    span: 8
  }
  // 其他表单项...
]);

watch(queryParams, newVal => {
  runAsync(newVal);
});

const formValues = ref({
  name: '',
  type: ''
  // 其他表单项的默认值...
});

const handleSearch = (values: Record<string, any>) => {
  console.log('搜索参数:', values);
  queryParams.formData = values;
  // 进行搜索操作...
};

const handleAction = (row: any) => {
  console.log('Action clicked', row);
};
const handleChange = (currentPage: number, pageSize: number) => {
  queryParams.page = currentPage;
  queryParams.pageSize = pageSize;
};
const router = useRouter();
const createNewBlog = () => {
  router.push('/newBlog');
};
</script>

<style scoped lang="less"></style>
