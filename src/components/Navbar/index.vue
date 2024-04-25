<script lang='jsx'>
import { app } from '@/themeConfig'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-64px w-full flex items-center justify-between rounded-1 bg-[var(--color-bg-2)] px-2 px-5 shadow-lg">
          <div className="flex items-center gap-2">
            <div className={`h-33px w-33px md:hidden ${app.logo}`} />
            <div className="text-18px font-500 md:hidden">
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
</script>
