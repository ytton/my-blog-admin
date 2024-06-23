<template>
  <div class="flex flex-col h-full p-4 bg-gray-200">
    <div class="bg-white filter pt-[18px] px-[18px]">
      <Filter :formList="formList" v-model:value="formValues" @search="handleSearch" />
    </div>
    <div class="table bg-white mt-[18px] flex-1 min-h-0 p-[18px]">
      <Table :columns="columns" :tableData="tableData" >
        <template #action="{ row }">
          <el-button type="primary" @click="handleAction(row)">Action</el-button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Filter from '@/components/Filter/Filter.vue';
import Table from '@/components/Table/Table.vue';
import { columns } from './table.columns';
const formList = ref([
  {
    input: 'el-input',
    inputProps: { placeholder: '请输入名称' },
    label: '名称',
    name: 'name',
    span: 8
  },
  {
    input: 'el-select',
    inputProps: { placeholder: '请选择类型' },
    label: '类型',
    name: 'type',
    span: 8
  }
  // 其他表单项...
]);

const formValues = ref({
  name: '',
  type: ''
  // 其他表单项的默认值...
});

const handleSearch = (values: Record<string, any>) => {
  console.log('搜索参数:', values);
  // 进行搜索操作...
};
const tableData = [
  { name: 'John', age: 25, address: 'New York' },
  { name: 'Jane', age: 30, address: '' },
  { name: null, age: null, address: null }
];
const handleAction = (row: any) => {
  console.log('Action clicked', row);
};
</script>

<style scoped lang="less"></style>
