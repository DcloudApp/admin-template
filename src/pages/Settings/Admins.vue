<route lang="json5">
  {
    name: 'Admins',
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
        <div>Admins</div>
      </>
    )
  },
})
</script>
