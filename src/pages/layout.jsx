import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { userAppStore } from '@/stores/userAppStore'
import { app } from '@/themeConfig'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const userAppStores = userAppStore()
    const { collapse } = storeToRefs(userAppStores)

    const localeType = ref('en-US')
    const locales = {
      'zh-CN': zhCN,
      'en-US': enUS,
    }
    const locale = computed(() => {
      return locales[localeType.value] || enUS
    })
    return () => (
      <>
        <a-config-provider locale={locale.value}>
          <div className="h-full w-full flex">
            <div className={`h-full overflow-hidden hidden md:flex-col md:flex ${collapse.value ? `md:w-48px` : `md:w-240px`}`}>
              <div className="h-70px w-full flex items-center justify-center gap-2 bg-[var(--color-bg-2)]">
                <div className={`h-33px w-33px i-svg-logo ${app.logo}`} />
                <div className={`text-18px font-500 text-[var(--color-text-1)] ${collapse.value ? `hidden` : `flex`}`}>
                  {app.title}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <Menu />
              </div>
            </div>
            <div className="flex flex-1 flex-col overflow-y-scroll bg-[var(--color-fill-2)]">
              <div className="sticky left-0 top-0 z-99 w-full backdrop-blur-md md:p-5 md:pb-0">
                <Navbar></Navbar>
              </div>
              <div className="flex flex-1 flex-col p-5 pb-0 backdrop-blur-md">
                <RouterView />
              </div>
              <Footer />
            </div>
          </div>
        </a-config-provider>
      </>
    )
  },
})
