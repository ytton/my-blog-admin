<template>
  <a-layout class="h-full">
    <a-layout-sider theme="light" class="w-[200px] border-r border-gray-200 border-solid bg-transparent">
      <div class="w-full px-3 h-[80px] flex items-center">
        <a-button :icon="h(SyncOutlined)" class="flex items-center justify-center w-full" type="primary">同步</a-button>
      </div>
      <a-menu
        :selectedKeys="[route.path.slice(1)]"
        :openKeys="openKeys"
        mode="inline"
        :items="items"
        @click="handleClick"
      ></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="flex" :style="{ background: '#fff', width: '100%' }">
        <h1 class="text-[20px] font-bold">博客后台</h1>
        <div class="flex items-center ml-auto">
          <span>欢迎回来，</span>
          <a-dropdown>
            <span class="flex items-center text-blue-500 cursor-pointer">
              <span class="mr-2">xxx</span>
              <DownOutlined />
              <a-avatar class="ml-3" src="https://cube.aemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">个人设置</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <!-- <a-container>
    <a-aside width="200px">
      
    </a-aside>
    <a-container>
      <a-header class="h-[80px] border-b border-solid border-gray-200 flex items-center">
        <h1 class="text-[20px] font-bold">博客后台</h1>
        <div class="flex items-center ml-auto">
          <span>欢迎回来，</span>
          <a-dropdown>
            <span class="flex items-center text-blue-500">
              xxx
              <a-icon class="a-icon--right">
                <arrow-down />
              </a-icon>
              <a-avatar class="ml-3" src="https://cube.aemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #dropdown>
              <a-dropdown-menu>
                <a-dropdown-item :icon="Setting">个人设置</a-dropdown-item>
                <a-dropdown-item divided :icon="SwitchButton">退出登录</a-dropdown-item>
              </a-dropdown-menu>
            </template>
          </a-dropdown>
        </div>
      </a-header>
      <a-main class="p-0"><RouterView /></a-main>
    </a-container>
  </a-container> -->
</template>

<script setup lang="ts">
import {
  SyncOutlined,
  BookOutlined,
  ReadOutlined,
  SettingOutlined,
  DeleteOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import { computed, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const openKeys = computed(() =>
  items.filter(x => x.children?.some(c => c.key === route.path.slice(1))).map(x => x.key)
);
const items = [
  {
    key: 'blog',
    icon: () => h(ReadOutlined),
    label: '博客',
    title: '博客',
    children: [
      {
        key: 'blogList',
        label: '博客列表',
        title: '博客列表'
      },
      {
        key: 'cateList',
        label: '分类列表',
        title: '分类列表'
      }
    ]
  },
  {
    key: 'specialTopic',
    icon: () => h(BookOutlined),
    label: '专题列表',
    title: '专题列表'
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '设置',
    title: '设置',
    children: [
      {
        key: 'personSettings',
        label: '个人信息设置',
        title: '个人信息设置'
      },
      {
        key: 'blogManagers',
        label: '博客成员列表',
        title: '博客成员列表'
      },
      {
        key: 'sysSettings',
        label: '系统设置',
        title: '系统设置'
      }
    ]
  },
  {
    key: 'trash',
    icon: () => h(DeleteOutlined),
    label: '回收站',
    title: '回收站'
  }
];
const handleClick = ({ key }: { key: string }) => {
  router.push({ path: key });
};
</script>

<style scoped lang="less"></style>
