import { storeToRefs } from 'pinia'
import router from './router/index'
import { isLogin } from '@/utils/auth'
import { usePermissionStore } from '@/stores/usePermissionStore'
import { sortTreeData } from '@/utils/index'

const RouteList = []
const whiteList = ['/login']

const comModules = import.meta.glob('./pages/**/**.jsx')

function setRouter(itemRouter) {
  itemRouter.forEach((item) => {
    const params = !item.path.includes('?') ? '' : `/:${item.path.split('?')[1]}`
    const path = !item.path.includes('?') ? item.path : item.path.split('?')[0]
    if (item.children && item.children.length > 0 && item.type === 1) {
      setRouter(item.children)
    }
    else {
      RouteList.push({
        name: path,
        path: `/${path}${params}`,
        component: comModules[`./pages/${path}.jsx`] || comModules[`./pages/${path}/index.jsx`],
      })
    }
  })
}

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('appVersion') !== import.meta.env.VITE_APP_VERSION) {
    localStorage.clear() // 清除所有本地存储
    localStorage.setItem('appVersion', import.meta.env.VITE_APP_VERSION) // 更新版本号
    next('/login')
  }
  else {
    if (isLogin()) {
      if (to.path === '/login') {
        next({ path: '/' })
      }
      else {
        const usePermissionStores = usePermissionStore()
        const { menus, isLogin } = storeToRefs(usePermissionStores)
        if (!isLogin.value) {
          await usePermissionStores.getUseInfo()
          setRouter(sortTreeData(menus.value))
          // 添加新的路由
          RouteList.forEach((item) => {
            router.addRoute('layout', item)
          })
          router.addRoute({
            path: '/:catchAll(.*)',
            redirect: '/404',
          })
          next({ ...to, replace: true })
        }
        else {
          next()
        }
      }
    }
    else {
      if (whiteList.includes(to.path))
        next()
      else
        next(`/login`)
    }
  }
})
