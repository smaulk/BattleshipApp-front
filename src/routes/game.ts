
const GameView = () => import('views/GameView.vue');
const GamesListView = () => import('views/GamesListView.vue');
const InvitesListView = () => import('views/InvitesListView.vue');

export default [
  {
    name: 'play',
    path: '/play',
    component: GameView,
  },
  {
    name: 'games',
    path: '/games',
    component: GamesListView,
  },
  {
    name: 'invites',
    path: '/invites',
    component: InvitesListView,
  },
]