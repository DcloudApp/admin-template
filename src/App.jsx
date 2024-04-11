export default defineComponent({
  setup() {
    const isDark = useDark()
    watch(() => isDark.value, (newVal) => {
      if (newVal)
        document.body.setAttribute('arco-theme', 'dark')
      else
        document.body.removeAttribute('arco-theme')
    }, { immediate: true })
    return () => (
      <>
        <RouterView />
      </>
    )
  },
})
