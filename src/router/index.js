import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import Wishlist from '../views/WishList.vue'; // Wishlist 컴포넌트 추가
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
    path: '/wishlist', 
    name: 'WishList', 
    component: Wishlist,
    meta: { requiresAuth: true }, // 인증 필요
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails, // MovieDetails.vue 생성 필요
  },
  { 
    path: '/', 
    redirect: '/signin', // 기본 경로를 로그인 페이지로 리다이렉트
  },  
];

const router = createRouter({
  history: createWebHashHistory(), // hash 모드 라우터
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  console.log('From:', from.path, 'To:', to.path, 'isAuthenticated:', isAuthenticated);

  // 
  if (to.path === '/signin' && isAuthenticated) {
    // 인증된 사용자가 /signin으로 이동하려 할 때
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next(); // 나머지 경우는 통과
  }
});

export default router;
