import { createWebHashHistory, createRouter } from 'vue-router';
// import Login from '../pages/login/Login.vue';
import Layout from '@/Layout.vue';
import BlogList from '@/pages/blog-list/BlogList.vue';
import EditBlog from '@/pages/blog-list/subPages/edit-blog/EditBlog.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';

const routes = [
  // { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', redirect: '/blogList' },
      { path: '/blogList', component: BlogList },
      { path: '/editBlog/:id', component: EditBlog },
      { path: '/newBlog', component: EditBlog },
      { path: '/cateList', component: Dashboard },
      { path: '/specialTopic', component: Dashboard },
      { path: '/personSettings', component: Dashboard },
      { path: '/blogManagers', component: Dashboard },
      { path: '/sysSettings', component: Dashboard },
      { path: '/trash', component: Dashboard }
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
