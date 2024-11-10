import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
  { path: '/', name: 'UserLogin', component: UserLogin }, // 기본 경로에 UserLogin.vue 연결
  { path: '/home', name: 'HomePage', component: HomePage }, // /home 경로에 HomePage.vue 연결
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
