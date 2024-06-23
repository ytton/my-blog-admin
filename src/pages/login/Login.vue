<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="p-6 border">
      <h1 class="mb-5 text-2xl text-center">用户登录</h1>
      <el-form ref="formRef" style="min-width: 300px" :model="loginForm" label-width="auto" size="large">
        <el-form-item
          prop="account"
          :rules="[
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ]"
        >
          <el-input v-model="loginForm.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[
            {
              required: true,
              message: '请输入密码'
            }
          ]"
        >
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item
          prop="checkCode"
          :rules="[
            {
              required: true,
              message: '请输入验证码'
            }
          ]"
        >
          <div class="flex">
            <el-input v-model="loginForm.checkCode" placeholder="请输入验证码" />
            <img
              class="h-full ml-3 cursor-pointer max-w-none"
              @click="changeCheckCode"
              :src="checkCodeUrl"
              alt="验证码"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="block w-full" type="primary" @click="submitForm(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';
import { login } from '@/services/user';
import md5 from 'md5';
const formRef = ref<FormInstance>();
const loginForm = reactive<{
  account: string;
  password: string;
  checkCode: string;
}>({
  account: '',
  password: '',
  checkCode: ''
});

const checkCodeUrl = ref('/api/checkCode' + '?' + new Date().getTime());

const changeCheckCode = () => {
  checkCodeUrl.value = '/api/checkCode' + '?' + new Date().getTime();
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      login({
        ...loginForm,
        password: md5(loginForm.password)
      })
        .then(res => {
          debugger
          res.data.status === 'success' && ElMessage.success('登录成功');
        })
        .catch(error => {
          debugger
          console.log(error);
        });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
