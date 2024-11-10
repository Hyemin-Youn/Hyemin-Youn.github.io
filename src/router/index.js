import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

<<<<<<< HEAD

const routes = [
  { path: '/', name: 'Home', component: Home },
=======
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
>>>>>>> feature/Home
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

<<<<<<< HEAD

  
=======
>>>>>>> feature/Home
export default router;
