import VueRouter from 'vue-router';
import store from '@/store';
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
    beforeEnter: (to, from, next) => {
      store.commit('user/setUserLoading', false);
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
