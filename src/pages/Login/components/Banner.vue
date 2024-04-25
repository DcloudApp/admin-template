<script lang='jsx'>
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img className="w-300px flex dark:hidden" src="../../../assets/img/login-logo-light.png" />
          <img className="hidden w-300px dark:flex" src="../../../assets/img/login-logo-dark.png" />
        </div>
      </>
    )
  },
})
</script>
