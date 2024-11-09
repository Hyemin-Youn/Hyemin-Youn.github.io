import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 라우터 경로를 확인하세요
import { fetchPopularMovies } from './URL';
import UserLogin from '../components/UserLogin.vue';


const app = createApp(App);
app.use(router);
app.mount("#app");

fetchPopularMovies(1)
  .then(data => console.log(data))
  .catch(error => console.error(error));