<script lang='jsx'>
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const router = useRouter()
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ path: '/' })
    }
    return () => (
      <>
        <div class="h-full w-full flex flex-col items-center justify-center">
          <a-result class="result" status="403" subtitle="Sorry, you do not have permission to access this resource"> </a-result>
          <div class="operation-row">
            <a-button
              key="back"
              type="primary"
              onClick={() => {
                back()
              }}
            >
              Back To Home
            </a-button>
          </div>
        </div>
      </>
    )
  },
})
</script>

<route lang="json5">
  {
    meta: {
      layout: false,
      requiresAuth:false,
    }
  }
</route>
