<template>
  <el-form :model="localValue" ref="formRef" label-width="100px" class="filter-form">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in formList" :key="index" v-bind="item.colProps" :span="item.span || 8">
        <el-form-item :label="item.label" :prop="item.name">
          <component
            :is="item.input"
            v-model="localValue[item.name]"
            v-bind="item.inputProps"
            :class="item.class"
          ></component>
        </el-form-item>
      </el-col>
      <el-col span="0" class="ml-auto">
        <el-space>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-space>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import { ElForm } from 'element-plus';

interface FormItem {
  input: string;
  inputProps?: Record<string, any>;
  label: string;
  name: string;
  class?: string;
  colProps?: Record<string, any>;
  span?: number;
}

const props = defineProps<{
  formList: FormItem[];
  value: Record<string, any>;
}>();

const emit = defineEmits(['update:value', 'search']);

const formRef = ref<InstanceType<typeof ElForm>>();
const localValue = ref({ ...props.value });

watch(
  () => props.value,
  newValue => {
    localValue.value = { ...newValue };
  }
);

const handleSearch = () => {
  emit('search', localValue.value);
};

const handleReset = () => {
  localValue.value = { ...props.value };
  formRef.value?.resetFields();
};
</script>
