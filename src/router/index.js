import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/Home.vue'; 
import UserLogin from '../components/UserLogin.vue';

const routes = [
  { path: "/", component: UserLogin },
  { path: "/home", component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
