import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import Wishlist from '../views/WishList.vue';
import MovieDetails from '../views/MovieDetails.vue'; // MovieDetails 추가
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
    meta: { requiresAuth: true }, // 인증 필요 설정
  },
  { 
    path: '/wishlist', 
    name: 'WishList', 
    component: Wishlist,
    meta: { requiresAuth: true }, // 인증 필요 설정
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
  },
  { 
    path: '/', 
    redirect: '/signin', // 기본 경로를 signin으로 리다이렉트
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 라우터 가드 수정
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // 인증 상태 확인

  console.log('From:', from.path, 'To:', to.path, 'isAuthenticated:', isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 페이지로 비인증 사용자가 접근하려는 경우
    console.log('Redirecting to /signin');
    next('/signin');
  } else if (to.name === 'SignIn' && isAuthenticated) {
    // 인증된 사용자가 /signin으로 접근하려는 경우
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next(); // 나머지 경로는 그대로 진행
  }
});

export default router;
