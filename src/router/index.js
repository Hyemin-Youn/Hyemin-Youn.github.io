import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import store from '../store';

const routes = [
  { path: '/signin', name: 'SignIn', component: SignIn },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true } // 인증이 필요한 경로 표시
  },
  { path: '/', redirect: '/signin' }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // 인증이 필요하지만 로그인되지 않은 경우 /signin으로 리다이렉트
    next('/signin');
  } else {
    next();
  }
});

export default router;
