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
        <div className="h-100vh w-full flex flex-col bg-[var(--color-bg-1)]">
          <div className="flex flex-1">
            <div className="hidden flex-1 md:flex">
              <Banner />
            </div>
            <div className="w-full flex flex-col items-center justify-center md:w-500px md:items-start">
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
