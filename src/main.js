// src/main.js
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // router 설정 가져오기
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');



