const LoginView = () => import('views/LoginView.vue');
const RegisterView = () => import('views/RegisterView.vue');

export default [
  {
    name: 'login',
    path: '/login',
    component: LoginView,
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView,
  },
]