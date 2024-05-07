import { usePermissionStore } from '@/stores/usePermissionStore'

export default {
  mounted(el, binding) {
    const usePermissionStores = usePermissionStore()
    const { permissions } = storeToRefs(usePermissionStores)
    const { value } = binding
    const values = value.match(/\/[^']+/g)
    if (values && Array.isArray(values) && values.length > 0) {
      const permissionFlag = values

      const hasPermissions = permissionFlag.every(flag => permissions.value.includes(flag))

      if (!hasPermissions)
        el.parentNode && el.parentNode.removeChild(el)
    }
    else {
      throw new Error(`请设置操作权限标签值`)
    }
  },
}
