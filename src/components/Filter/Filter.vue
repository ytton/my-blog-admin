<template>
  <a-form :model="localValue" ref="formRef" label-width="100px" class="filter-form">
    <a-row :gutter="20">
      <a-col v-for="(item, index) in formList" :key="index" v-bind="item.colProps" :span="item.span || 8">
        <a-form-item :label="item.label" :prop="item.name">
          <component
            :is="item.input"
            v-model="localValue[item.name]"
            v-bind="item.inputProps"
            :class="item.class"
          ></component>
        </a-form-item>
      </a-col>
      <a-col class="ml-auto">
        <a-space>
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
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

const formRef = ref();
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
