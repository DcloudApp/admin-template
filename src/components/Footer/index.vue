<script lang='jsx'>
import { footer } from '@/themeConfig'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-40px w-full flex flex-shrink-0 items-center justify-center text-[var(--color-text-2)]">{footer.title}</div>
      </>
    )
  },
})
</script>
