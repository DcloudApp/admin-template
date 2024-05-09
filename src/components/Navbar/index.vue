<script lang='jsx'>
import Menu from '../Menu/index.vue'
import { userAppStore } from '@/stores/userAppStore'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const userAppStores = userAppStore()
    const { drawerVisible } = storeToRefs(userAppStores)
    return () => (
      <>
        <div className="h-64px w-full flex items-center justify-between rounded-1 bg-[var(--color-bg-2)] px-2 px-5 shadow-lg md:justify-end">
          <div className="flex items-center gap-2 md:hidden">
            <a-tag
              class="cursor-pointer"
              onClick={() => {
                drawerVisible.value = true
              }}
            >
              <icon-menu-unfold />
            </a-tag>
          </div>
          <div className="flex items-center gap-5 pr-20px">
            <Language />
            <Dark />
            <Login />
          </div>
        </div>
        <a-drawer
          v-model:visible={drawerVisible.value}
          width={240}
          header={false}
          footer={false}
          placement="left"
        >
          <div className="h-full flex flex-col overflow-hidden">
            <div className="h-70px w-full flex items-center justify-center gap-2 bg-[var(--color-bg-2)]">
              <Logo />
            </div>

            <div className="flex-1 overflow-hidden">
              <Menu />
            </div>
          </div>

        </a-drawer>
      </>
    )
  },
})
</script>
