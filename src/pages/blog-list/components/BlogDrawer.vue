<template>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    title="新增博客"
    placement="right"
    @after-open-change="afterOpenChange"
  >
  
  </a-drawer>
</template>

<script setup lang="ts">
const open = defineModel('open', { required: true });
const props = defineProps<{ visible: boolean }>();
const afterOpenChange = ()=>{

}
</script>

<style scoped lang="less"></style>
