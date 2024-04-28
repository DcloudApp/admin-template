<script lang='jsx'>
import { getImageUrl } from '@/utils/index'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img className="w-300px flex dark:hidden" src={getImageUrl('login-logo-light.png')} />
          <img className="hidden w-300px dark:flex" src={getImageUrl('login-logo-dark.png')} />
        </div>
      </>
    )
  },
})
</script>
