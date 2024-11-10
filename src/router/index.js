import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '../views/Home.vue'; 
import MovieDetail from '../views/MovieDetail.vue'; 
 
const routes = [ 
  { path: '/', component: Home }, 
  { path: '/movie/:id', component: MovieDetail }, 
]; 
 
const router = createRouter({ 
  history: createWebHistory(), 
  routes, 
}); 
 
export default router; 