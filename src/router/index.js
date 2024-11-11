import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../components/sign-in/SignIn.vue';



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: 'SignIn', name: "SignIn", component: SignIn}
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



export default router;
