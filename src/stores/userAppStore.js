import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userAppStore = defineStore('userAppStore', () => {
  const collapse = ref(false)
  const drawerVisible = ref(false)

  return { collapse, drawerVisible }
})
