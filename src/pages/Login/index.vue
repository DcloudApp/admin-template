<route lang="json5">
  {
    meta: {
      layout: false,
      requiresAuth:false,
    }
  }
</route>

<script lang='jsx'>
import LoginForm from '@/pages/Login/components/LoginForm.vue'
import Banner from '@/pages/Login/components/Banner.vue'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="relative h-100vh w-full flex flex-col bg-[var(--color-bg-1)]">
          <div className="bg absolute left-0 top-0 h-full h-full w-full flex flex-col items-center justify-center">
            <div className="i-svg-bg hidden h-full w-full md:flex"></div>
          </div>
          <div className="z-1 flex flex-1">
            <div className="hidden flex-1 md:flex">
              <Banner />
            </div>
            <div className="z-1 z-1 w-full flex flex-col items-center justify-center 2xl:w-700px md:w-500px lg:items-start">
              <div class="content-inner">
                <LoginForm />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  },
})
</script>

<style lang="scss" scoped>
.bg {
  transform: rotate(180deg) scaleY(-1);
}
</style>
