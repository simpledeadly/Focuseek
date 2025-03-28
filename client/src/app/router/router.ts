import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../auth/auth'

const routes = [
  { path: '/register', component: () => import('@/pages/auth/register'), name: 'register' },
  { path: '/login', component: () => import('@/pages/auth/login'), name: 'login' },
  { path: '/collections', component: () => import('@/pages/collections'), name: 'collections' },
  {
    path: '/:collection',
    component: () => import('@/pages/todos'),
    name: 'todos',
    meta: { requiresAuth: true },
  },
  {
    path: '/:collection?type=note',
    component: () => import('@/pages/notes'),
    name: 'notes',
    meta: { requiresAuth: true },
  },
  // { path: '/collections/:collection/info', component: () => import('@/pages/collection'), name: 'collection' },
  {
    path: '/account',
    component: () => import('@/pages/profile'),
    name: 'account',
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    component: () => import('@/pages/settings'),
    name: 'settings',
    meta: { requiresAuth: true },
  },
  { path: '/404', component: () => import('@/pages/not-found'), name: '404' },
  { path: '/:catchAll(.*)', redirect: { name: '404' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
