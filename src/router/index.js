import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import Wishlist from '../views/WishList.vue';
import store from '../store';
import MovieDetail from "@/views/MovieDetail.vue";
import SliderContent from '../components/SliderContent.vue';
import Popular from "@/views/Popular.vue";
import Search from "@/views/Search.vue";



const routes = [
  { 
    path: '/signin', 
    name: 'SignIn', 
    component: SignIn,
    meta: { hideNavbar: true }, // Navbar를 숨기기 위한 메타 데이터
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
  {
    path: "/movies/:id",
    component: MovieDetail 
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist 
  },
  {
    path: "/slider",
    name: 'SliderContent',
    component: SliderContent, 
  },
  {
    path: "/popular-infinite",
    name: "PopularInfinite",
    component: PopularInfinite,
  },
  {
    path: "/popular-table",
    name: "PopularTable",
    component: PopularTable,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.name === 'SignIn' && isAuthenticated) {
    next('/home'); // 인증된 사용자가 로그인 페이지로 접근할 때
  } else {
    next(); // 나머지 경우는 통과
  }
});

export default router;
