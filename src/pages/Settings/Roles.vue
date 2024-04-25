<route lang="json5">
  {
    name: 'Roles',
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
        <div>Roles</div>
      </>
    )
  },
})
</script>
