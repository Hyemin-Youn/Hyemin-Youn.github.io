import { createRouter, createWebHashHistory } from 'vue-router';
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
    meta: { requiresAuth: true }, // 인증이 필요한 경로
  },
  { 
    path: '/', 
    redirect: '/signin', // 기본 경로 리다이렉트
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Hash 모드
  routes,
});

// 라우트 가드 설정
router.beforeEach((to, from, next) => {
  console.log('From:', from.path, 'To:', to.path);

  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    console.log('Redirecting to /signin');
    next('/signin');
  } else if (to.path === '/signin' && store.getters.isAuthenticated) {
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next();
  }
});

export default router;
