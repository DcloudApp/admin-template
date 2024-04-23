import { required } from '@/utils/index'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img className="w-300px flex dark:hidden" src={required('@/assets/img/auth-v2-forgot-password-illustration-light.png')} />
          <img className="hidden w-300px dark:flex" src={required('@/assets/img/auth-v2-forgot-password-illustration-dark.png')} />
        </div>
      </>
    )
  },
})
