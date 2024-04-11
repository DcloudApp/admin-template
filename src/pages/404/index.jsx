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
          <a-result class="result" status="404" subtitle="Page Not Found :("> </a-result>
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
