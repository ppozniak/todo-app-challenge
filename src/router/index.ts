import { createRouter, createWebHistory } from "vue-router";
import Board from "../pages/BoardPage.vue";
import Login from "../pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
