import { computed } from 'vue'
import { usePermissionStore } from '@/stores/usePermissionStore'
import { userAppStore } from '@/stores/userAppStore'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    // const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()

    const usePermissionStores = usePermissionStore()
    const { menus } = storeToRefs(usePermissionStores)
    const userAppStores = userAppStore()
    const { collapse } = storeToRefs(userAppStores)

    const settingsMenu = computed(() => {
      const findMenuItem = (items) => {
        for (const item of items) {
          if (`/${item.path}` === route.path) {
            return item
          }
          else if (item.children) {
            const childMenu = findMenuItem(item.children)
            if (childMenu)
              return childMenu
          }
        }
        return null
      }
      return findMenuItem(menus.value)
    })

    const goto = (path) => {
      router.push({
        path: `/${path}`,
      })
    }

    return () => (
      <>
        <a-menu
          class="h-full max-w-240px"
          style="box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);"
          default-open-keys={[settingsMenu.value.parent_id]}
          default-selected-keys={[settingsMenu.value.id]}
          show-collapse-button
          onCollapse={(type) => {
            collapse.value = type
          }}
          level-indent={33}
        >
          {menus.value.map((item) => {
            return (
              <>
                {item?.children
                  ? (
                    <>
                      {item.hidden === 0
                        ? (
                          <a-sub-menu key={item.id}>
                            {{ default: () => {
                              return (
                                <>
                                  {item.children.map((items) => {
                                    return (
                                      <>
                                        <a-menu-item
                                          key={items.id}
                                          onClick={() => goto(items.path)}
                                        >
                                          {items.name}
                                        </a-menu-item>
                                      </>
                                    )
                                  })}
                                </>
                              )
                            }, icon: () => {
                              return <div className="i-tabler-users"></div>
                            }, title: () => {
                              return <div>{item.name}</div>
                            } }}
                          </a-sub-menu>
                          )
                        : null}
                    </>
                    )
                  : (
                    <>
                      {item.hidden === 0
                        ? (
                          <a-menu-item
                            key={item.id}
                            onClick={() => {
                              goto(item.path)
                            }}
                          >
                            {{ icon: () => {
                              return <div className="i-tabler-users"></div>
                            }, default: () => {
                              return <div>{item.name}</div>
                            } }}
                          </a-menu-item>
                          )
                        : null}
                    </>
                    )}
              </>
            )
          })}
        </a-menu>
      </>
    )
  },
})
