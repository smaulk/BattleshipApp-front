import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";
import auth from "@/routes/auth.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    ...auth,
  ],
});

export default router;