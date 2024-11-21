import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import Wishlist from '../views/WishList.vue';
import store from '../store';

const routes = [
  { 
    path: '/signin', 
    name: 'SignIn', 
    component: SignIn,
  },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true },
  },
  { 
    path: '/', 
    redirect: '/signin',
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin'); // 인증이 필요한 경로에 접근할 때
  } else if (to.name === 'SignIn' && isAuthenticated) {
    next('/home'); // 인증된 사용자가 로그인 페이지로 접근할 때
  } else {
    next(); // 나머지 경우는 통과
  }
});

export default router;
