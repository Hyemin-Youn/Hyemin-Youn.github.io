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
    meta: { requiresAuth: true },
  },
  { 
    path: '/wishlist', 
    name: 'WishList', 
    component: Wishlist,
    meta: { requiresAuth: true },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
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

  console.log('From:', from.path, 'To:', to.path, 'isAuthenticated:', isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to /signin');
    next('/signin');
  } else if (to.path === '/signin' && isAuthenticated) {
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next();
  }
});

export default router;
