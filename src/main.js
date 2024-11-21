// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // router 설정 가져오기
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft, faAngleRight, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

library.add(faAngleLeft, faAngleRight, faHeart, faShareNodes);

app.component('font-awesome-icon', FontAwesomeIcon);

