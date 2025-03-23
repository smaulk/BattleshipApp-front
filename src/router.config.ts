import { createRouter, createWebHistory, RouteLocationNormalized, Router } from "vue-router";
import auth from "@/routes/auth.ts";
import url from "@/routes/url.ts";
import main from "@/routes/main.ts";
import game from '@/routes/game.ts'
import { checkAuth } from "@/services/AuthService.ts";
import { useLoading } from "@/composables/Loading.ts";

const { unique } = useLoading();
const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...auth,
    ...url,
    ...main,
    ...game,
  ],
});

const onlyGuestRoutes = ['login', 'register', 'reset-password'];
const onlyLoggedRoutes = ['settings', 'friends', 'statistics']

router.beforeEach(async (
  to: RouteLocationNormalized,
): Promise<boolean | object> => {
  // Блокируем параллельное выполнение кода
  return unique(async (): Promise<boolean | object> => {
    const name: string | undefined = to.name?.toString();
    if (!name) return false;

    const isLogged: boolean = await checkAuth();
    return name === 'home'
    || isLogged && !onlyGuestRoutes.includes(name)
    || !isLogged && !onlyLoggedRoutes.includes(name)
      ? true
      : { name: 'home' };
  }, false);
});


export default router;