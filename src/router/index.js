import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';
import store from '../store';

const routes = [
  { 
    path: '/', 
    name: 'SignIn', 
    component: SignIn 
  },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true },
  },
  // { 
  //   path: '/', 
  //   redirect: '/signin',
  // },
];

const router = createRouter({
  history: createWebHashHistory(),//hash
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  console.log('From:', from.path, 'To:', to.path, 'isAuthenticated:', isAuthenticated);

  if (to.path === '/' && isAuthenticated) {
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next();
  }
});

export default router;
