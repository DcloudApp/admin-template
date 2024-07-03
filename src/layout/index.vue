<script lang='jsx'>
import { userAppStore } from '@/stores/userAppStore'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const userAppStores = userAppStore()
    const { collapse } = storeToRefs(userAppStores)

    return () => (
      <>
        <div className="h-full w-full flex">
          <div className={`h-full overflow-hidden hidden md:flex-col md:flex ${collapse.value ? `md:w-48px` : `md:w-240px`}`}>
            <div className="h-70px w-full flex items-center justify-center gap-2 bg-[var(--color-bg-2)]">
              <Logo showTitle={!collapse.value} />
            </div>
            <div className="flex-1 overflow-hidden">
              <Menu />
            </div>
          </div>
          <div className="myScrollbar flex flex-1 flex-col overflow-y-scroll bg-[var(--color-fill-2)]">
            <div className="sticky left-0 top-0 z-99 w-full backdrop-blur-md md:p-5 md:pb-0">
              <Navbar></Navbar>
            </div>
            <div className="flex flex-1 flex-col p-5 pb-0 backdrop-blur-md">
              <RouterView />
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  },
})
</script>
