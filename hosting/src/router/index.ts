import store from '@/stores'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Invalid = () => import('@/views/Invalid.vue')

const routes: RouteRecordRaw[] = [
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
      store.commit('user/setUserLoading', false)
      next()
    },
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
