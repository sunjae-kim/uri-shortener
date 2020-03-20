import VueRouter from 'vue-router';
const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const Invalid = () => import('@/views/Invalid.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/invalid',
    name: 'invalid',
    component: Invalid,
    props: route => ({ keyword: route.query.keyword }),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
