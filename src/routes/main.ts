import MainView from "views/MainView.vue";
import NotFoundView from "views/NotFoundView.vue";

export default [
  {
    name: 'home',
    path: '/',
    component: MainView,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];