import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './auth'

const routes = [
  { path: '/', component: () => import('@/pages/todo'), name: 'todo', meta: { requiresAuth: true } },
  { path: '/?type=note', component: () => import('@/pages/notes'), name: 'notes', meta: { requiresAuth: true } },
  { path: '/?type=project', component: () => import('@/pages/projects'), name: 'projects', meta: { requiresAuth: true } },
  { path: '/register', component: () => import('@/pages/auth/register'), name: 'register' },
  { path: '/login', component: () => import('@/pages/auth/login'), name: 'login' },
  { path: '/404', component: () => import('@/pages/not-found'), name: '404' },
  { path: '/:catchAll(.*)', redirect: { name: '404' } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
