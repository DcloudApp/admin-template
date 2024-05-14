<script lang='jsx'>
export default defineComponent({
  setup() {
    return () => (
      <>
        <div>
          EventManagement
        </div>
      </>
    )
  },
})
</script>

<route lang="json5">
  {
    name: 'EventManagement',
    meta: {
      requiresAuth:true,
    }
  }
</route>
