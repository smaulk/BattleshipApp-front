const LoginView = () => import('views/LoginView.vue');
const RegisterView = () => import('views/RegisterView.vue');

const LogoutView = () => import('views/LogoutView.vue')

export default [
  {
    name: 'Login',
    path: '/login',
    component: LoginView,
  },
  {
    name: 'Register',
    path: '/register',
    component: RegisterView,
  },
  {
    name: 'Logout',
    path: '/logout',
    component: LogoutView,
  },
]