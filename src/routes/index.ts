import MainView from "views/MainView.vue";
import GameView from "views/GameView.vue";
import NotFoundView from "views/NotFoundView.vue";

export default [
  {
    name: 'Main',
    path: '/',
    component: MainView,
  },
  {
    name: 'Game',
    path: '/game',
    component: GameView,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];