<script  lang='jsx'>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    const isDark = useDark()
    watch(() => isDark.value, (newVal) => {
      if (newVal)
        document.body.setAttribute('arco-theme', 'dark')
      else
        document.body.removeAttribute('arco-theme')
    }, { immediate: true })

    const localeType = ref('en-US')
    const locales = {
      'zh-CN': zhCN,
      'en-US': enUS,
    }
    const locale = computed(() => {
      return locales[localeType.value] || enUS
    })
    return () => (
      <>
        <a-config-provider locale={locale.value}>
          <RouterView />
        </a-config-provider>
      </>
    )
  },
})
</script>
