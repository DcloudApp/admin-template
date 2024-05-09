import { defineStore } from 'pinia'
import { ref } from 'vue'
import { siteInfo } from '@/https/api/userApi'

export const usePermissionStore = defineStore('usePermissionStore', () => {
  const menus = ref([])
  const permissions = ref([])
  const isLogin = ref(false)
  const userData = ref(null)

  function getUseInfo() {
    return new Promise((resolve, reject) => {
      siteInfo().then((res) => {
        const { code, data } = res
        if (code === 200) {
          menus.value = data.menus
          permissions.value = data.permissions
          userData.value = data.user_info
          isLogin.value = true
          resolve() // 异步操作完成，调用 resolve()
        }
        else {
          reject(new Error('Failed to get user info')) // 异步操作失败，调用 reject()
        }
      }).catch((error) => {
        reject(error) // 捕获异步操作中的错误，调用 reject()
      })
    })
  }

  function reset() {
    isLogin.value = false
    permissions.value = []
    menus.value = []
    userData.value = null
  }

  return { menus, permissions, isLogin, getUseInfo, reset }
})
