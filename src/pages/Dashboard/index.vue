<route lang="json5">
  {
    path:'/',
    name: 'dashboard',
    meta: {
      requiresAuth:true,
    }
  }
</route>

<script lang='jsx'>
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    return () => (
      <>
        <div className="h-1000px w-full bg-red">dashboard</div>
      </>
    )
  },
})
</script>
