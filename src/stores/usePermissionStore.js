import { defineStore } from 'pinia'
import { ref } from 'vue'
import { siteInfo } from '@/https/api/userApi'

export const usePermissionStore = defineStore('usePermissionStore', () => {
  const menus = ref([])
  const permissions = ref([])
  const isLogin = ref(false)

  async function getUseInfo() {
    const { code, data } = await siteInfo()
    if (code === 200) {
      menus.value = data.menus
      permissions.value = data.permissions
      localStorage.setItem('userData', JSON.stringify(data.user_info))
      isLogin.value = true
    }
  }
  function reset() {
    isLogin.value = false
    permissions.value = []
    menus.value = []
  }

  return { menus, permissions, isLogin, getUseInfo, reset }
})
