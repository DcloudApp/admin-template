import { app } from '@/themeConfig'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-60px w-full flex items-center justify-between b-b-1px b-[var(--color-border)] b-solid bg-[var(--color-bg-2)] px-2 px-5 md:b-r-1px">
          <div className="flex items-center gap-2">
            <div className={`h-33px w-33px i-svg-logo ${app.logo}`} />
            <div className="text-18px font-500">
              {app.title}
            </div>
          </div>
          <div className="flex items-center gap-5 pr-20px">
            <Language />
            <Dark />
            <Login />
          </div>
        </div>
      </>
    )
  },
})
