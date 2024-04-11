import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout.jsx'),
      redirect: '/Dashboard',
      children: [
        {
          path: '/Dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/Dashboard/index.jsx'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/index.jsx'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404/index.jsx'),
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('appVersion') !== import.meta.env.VITE_APP_VERSION) {
    localStorage.clear() // 清除所有本地存储
    localStorage.setItem('appVersion', import.meta.env.VITE_APP_VERSION) // 更新版本号
  }
  next()
})

export default router
