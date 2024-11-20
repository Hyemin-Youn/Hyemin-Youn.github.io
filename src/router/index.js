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
    meta: { requiresAuth: true },
  },
  { 
    path: '/', 
    redirect: '/signin',
  },
];

const router = createRouter({
  history: createWebHashHistory(),//hash
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 경로인데 인증되지 않은 경우
    console.log('Redirecting to /signin');
    next('/signin');
  } else if (to.path === '/signin' && isAuthenticated) {
    // 인증된 사용자가 /signin으로 이동하려 할 때
    console.log('Redirecting to /home');
    next('/home');
  } else {
    next(); // 나머지 경우는 통과
  }
});


export default router;
