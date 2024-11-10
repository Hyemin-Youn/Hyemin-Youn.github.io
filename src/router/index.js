import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '@/components/sign-in/SignIn.vue';
import Home from '@/components/home/Home.vue';
import HomeMain from '@/components/home/main/HomeMain.vue';
import HomeWishlist from '@/components/home/wishlist/HomeWishlist.vue';
import HomeSearch from '@/components/search/HomeSearch.vue';
import HomePopular from '@/components/home/popular/HomePopular.vue';

// 라우트 정의
const routes = [
  {
    path: '/',
    component: Home,
    // canActivate: [AuthGuard],  // Vue에서는 auth guard를 메서드로 따로 설정합니다.
    children: [
      {
        path: '',
        component: HomeMain
      },
      {
        path: 'popular',
        component: HomePopular
      },
      {
        path: 'wishlist',
        component: HomeWishlist
      },
      {
        path: 'search',
        component: HomeSearch
      }
    ]
  },
  {
    path: '/signin',
    component: SignIn
  }
];

// 라우터 생성
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 네비게이션 가드 추가 (AuthGuard 구현 필요 시 추가)
router.beforeEach((to, from, next) => {
  // 예: 인증이 필요한 페이지에 대한 네비게이션 가드
  // if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
  //   next('/signin');
  // } else {
  //   next();
  // }
  next();
});

export default router;
