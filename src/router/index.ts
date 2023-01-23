import { createRouter, createWebHistory } from "vue-router";
import Board from "@/pages/BoardPage.vue";
import Login from "@/pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/board",
    name: "board",
    component: Board,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
