// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import UserLogin from '../components/UserLogin.vue';



const routes = [
  { path: '/home', component: HomePage },
  { path: '/', component: UserLogin },
 
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
