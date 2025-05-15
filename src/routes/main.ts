
const HomeView = () => import('views/HomeView.vue');
const NotFoundView = () => import('views/NotFoundView.vue');
const FriendsListView = () => import('views/FriendsListView.vue');
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
    component: FriendsListView,
  },
  {
    name: 'user',
    path: '/users/:userId',
    component: UserView,
    props: true,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];