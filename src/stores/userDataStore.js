import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userDataStore', () => {
  const userData = ref(JSON.parse(localStorage.getItem('userData')))

  return { userData }
})
