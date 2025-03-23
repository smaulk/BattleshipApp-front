
const HomeView = () => import('views/HomeView.vue');
const NotFoundView = () => import('views/NotFoundView.vue');

export default [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];