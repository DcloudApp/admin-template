import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { isLogin } from '@/utils/auth'
import { usePermissionStore } from '@/stores/usePermissionStore'

const routes = []
generatedRoutes.forEach((v) => {
  routes.push(v?.meta?.layout !== false ? setupLayouts([v])[0] : v)
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const LOGIN_PAGE_KEY = '/login'
const PERMISSIONS = '401'

function checkPathExists(data, pathToCheck) {
  // 遍历数据数组
  for (let i = 0; i < data.length; i++) {
    // 兼容老版本权限代码
    if (pathToCheck === '/' && data[i].path === 'index')
      return true

    // 检查当前元素的"path"是否与要检查的"path"匹配
    if (`/${data[i].path}` === pathToCheck) {
      // 如果匹配，则返回true
      return true
    }
    // 如果当前元素有子元素，则递归地检查子元素的"path"
    if (data[i].children && data[i].children.length > 0) {
      if (checkPathExists(data[i].children, pathToCheck)) {
        // 如果子元素中有匹配的"path"，则返回true
        return true
      }
    }
  }
  // 如果没有找到匹配的"path"，则返回false
  return false
}
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('appVersion') !== import.meta.env.VITE_APP_VERSION) {
    localStorage.clear() // 清除所有本地存储
    localStorage.setItem('appVersion', import.meta.env.VITE_APP_VERSION) // 更新版本号
    next(LOGIN_PAGE_KEY)
  }
  else {
    if (isLogin()) {
      // 判断是否需要权限
      if (to.meta.requiresAuth) {
        const usePermissionStores = usePermissionStore()
        const { menus, isLogin } = storeToRefs(usePermissionStores)
        if (!isLogin.value)
          await usePermissionStores.getUseInfo()
        if (checkPathExists(menus.value, to.path))
          next()
        else
          next(PERMISSIONS)
      }
      else {
        next()
      }
    }
    else {
      if (to.meta.requiresAuth)
        next(LOGIN_PAGE_KEY)
      else
        next()
    }
  }
})

export default router
