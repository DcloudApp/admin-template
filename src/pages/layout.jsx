import { userAppStore } from '@/stores/userAppStore'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const userAppStores = userAppStore()
    const { collapse } = storeToRefs(userAppStores)
    const menuWidth = computed(() => {
      return collapse.value ? `md:pl-48px` : `md:pl-240px`
    })
    return () => (
      <>
        <div className="h-full w-full flex flex-col">
          <div className="sticky left-0 top-0 z-99 w-full">
            <Navbar></Navbar>
          </div>
          <div className="fixed left-0 top-60px hidden h-[calc(100%-60px)] md:flex">
            <Menu />
          </div>
          <div className={`w-full flex flex-col min-h-100vh bg-[var(--color-fill-2)] ${menuWidth.value}   `}>
            <div className="flex flex-1 flex-col p-5 pb-0">
              <RouterView />
            </div>
            <Footer />
          </div>
        </div>

      </>
    )
  },
})
