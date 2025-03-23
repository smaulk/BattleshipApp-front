const VerifyEmailView = () => import('views/VerifyEmailView.vue')
const ResetPasswordView = () => import('views/ResetPasswordView.vue')

export default [
  {
    name: 'verify-email',
    path: '/verify-email/:id/:hash',
    component: VerifyEmailView,
  },
  {
    name: 'reset-password',
    path: '/reset-password/:token',
    component: ResetPasswordView,
  },
];