<template>
  <el-container class="h-full">
    <el-aside width="200px" class="border-r border-gray-200 border-solid">
      <div class="w-full px-3 h-[80px] flex items-center">
        <el-button :icon="Refresh" class="w-full" type="primary">同步</el-button>
      </div>
      <el-menu default-active="2" class="border-r-0" router>
        <el-sub-menu index="blog">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>博客</span>
          </template>
          <el-menu-item index="blogList">
            <template #title>
              <span>博客列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="cateList">
            <template #title>
              <span>分类列表</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="specialTopic"
          ><template #title>
            <el-icon><Reading /></el-icon>
            <span>专题列表</span>
          </template></el-menu-item
        >
        <el-sub-menu index="settings">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </template>
          <el-menu-item index="personSettings">
            <template #title>
              <span>个人信息设置</span>
            </template>
          </el-menu-item>
          <el-menu-item index="blogManagers">
            <template #title>
              <span>博客成员</span>
            </template>
          </el-menu-item>
          <el-menu-item index="sysSettings">
            <template #title>
              <span>系统设置</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="trash"
          ><template #title>
            <el-icon><Delete /></el-icon>
            <span>回收站</span>
          </template></el-menu-item
        >
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="h-[80px] border-b border-solid border-gray-200 flex items-center">
        <h1 class="text-[20px] font-bold">博客后台</h1>
        <div class="flex items-center ml-auto">
          <span>欢迎回来，</span>
          <el-dropdown>
            <span class="flex items-center text-blue-500">
              xxx
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
              <el-avatar class="ml-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Setting">个人设置</el-dropdown-item>
                <el-dropdown-item divided :icon="SwitchButton">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="p-0"><RouterView /></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Document, Delete, Reading, Setting, Refresh, ArrowDown, SwitchButton } from '@element-plus/icons-vue';
</script>

<style scoped lang="less"></style>
