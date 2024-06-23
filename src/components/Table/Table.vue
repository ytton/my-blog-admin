<template>
  <el-table :data="tableData" style="width: 100%">
    <template v-for="column in columns" :key="column.prop">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align"
        :formatter="column.formatter ? column.formatter : defaultFormatter"
      >
        <template v-slot="scope">
          <slot :name="column.slot" v-bind="scope">
            {{ column.formatter ? column.formatter(scope.row, column) : defaultFormatter(scope.row, column) }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts" generic="T extends Record<string,any>">
import { defineProps } from 'vue';

interface Column<T> {
  prop: keyof T;
  label: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  slot?: string;
  formatter?: (row: T, column: Column<T>) => string;
  default?: string;
}

defineProps<{
  columns: Column<T>[];
  tableData: T[];
}>();

const defaultFormatter = (row: T, column: Column<T>) => {
  const value = row[column.prop];
  return value === null || value === undefined || value === '' ? column.default || '--' : value;
};
</script>

<style scoped>
/* 你的样式 */
</style>
