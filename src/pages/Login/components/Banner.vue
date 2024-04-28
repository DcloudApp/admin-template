<script lang='jsx'>
import loginLogoLight from '@/assets/img/login-logo-light.png'
import loginLogoDark from '@/assets/img/login-logo-dark.png'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img className="w-300px flex dark:hidden" src={loginLogoLight} />
          <img className="hidden w-300px dark:flex" src={loginLogoDark} />
        </div>
      </>
    )
  },
})
</script>
