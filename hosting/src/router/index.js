import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Invalid from '@/views/Invalid.vue';

const routes = [
  { path: '/', name: 'hoem', component: Home },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/invalid',
    name: 'invalid',
    component: Invalid,
    props: route => ({ short: route.query.short }),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
