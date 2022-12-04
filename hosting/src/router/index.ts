import { ROUTE_NAMES } from '@/utils/router/types'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/sign-in',
    name: ROUTE_NAMES.SIGN_IN,
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/invalid',
    name: ROUTE_NAMES.INVALID,
    component: () => import('@/views/Invalid.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})
