
const HomeView = () => import('views/HomeView.vue');
const NotFoundView = () => import('views/NotFoundView.vue');
const FriendsView = () => import('views/FriendsView.vue');
const UserView = () => import('views/UserView.vue');

export default [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    name: 'friends',
    path: '/friends',
    component: FriendsView,
  },
  {
    name: 'user',
    path: '/users/:id',
    component: UserView,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];