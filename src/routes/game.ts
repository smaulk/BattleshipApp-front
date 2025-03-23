
const GameView = () => import('views/GameView.vue')

export default [
  {
    name: 'game',
    path: '/game',
    component: GameView,
  },
]