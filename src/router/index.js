// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import MovieList from '@/components/MovieList.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/movies', component: MovieList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
