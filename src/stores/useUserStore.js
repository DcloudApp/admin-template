import { ref } from 'vue'
import { defineStore } from 'pinia'
import { clearToken, setToken } from '@/utils/auth'
import {
  login as userLogin,
} from '@/https/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  async function login(loginForm) {
    try {
      const { code, data, msg } = await userLogin(loginForm)
      if (code === 200) {
        userInfo.value = data
        setToken(data.token)
      }
      else {
        throw msg
      }
    }
    catch (err) {
      clearToken()
      throw err
    }
  }

  return {
    login,
    userInfo,
  }
})
