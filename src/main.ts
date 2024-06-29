import 'modern-normalize/modern-normalize.css';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { router } from './router';

createApp(App).use(router).use(Antd).mount('#app');
