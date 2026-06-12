import { defineRouter } from '#q-app/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'

import { useAuthStore } from 'stores/auth'

export default defineRouter(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // AUTH GUARD (AQUI É O QUE FALTAVA)
  Router.beforeEach((to) => {
    const auth = useAuthStore()

    const isAuth = auth.isAuthenticated

    // se precisa login e não está logado
    if (to.meta.requiresAuth && !isAuth) {
      return '/login'
    }

    // se já está logado e tenta ir pra login/register
    if ((to.path === '/login' || to.path === '/register') && isAuth) {
      return '/'
    }

    return true
  })

  return Router
})
