import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue"; // 경로를 실제 컴포넌트 위치에 맞게 조정하세요.
import UserLogin from "../UserLogin.vue";

const routes = [
  { path: "/", component: UserLogin },
  { path: "/home", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
