// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // router 설정 가져오기

const app = createApp(App);
app.use(router);
app.mount('#app');
