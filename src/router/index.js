import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import store from '../store';

const routes = [
  { 
    path: '/signin', 
    name: 'SignIn', 
    component: SignIn 
  },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true } // 인증이 필요한 경로 표시
  },
  { 
    path: '/', 
    redirect: '/signin' // 기본 경로로 접근 시 로그인 페이지로 리다이렉트
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 라우트 가드 설정
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // 인증이 필요한 경로에 접근하려고 하지만 로그인되지 않은 경우 /signin으로 리다이렉트
    next('/signin');
  } else if (to.path === '/signin' && store.getters.isAuthenticated) {
    // 로그인된 상태에서 /signin으로 접근하려고 하면 홈으로 리다이렉트
    next('/home');
  } else {
    next();
  }
});

export default router;
