<script  lang='jsx'>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { watch } from 'vue'

export default defineComponent({
  setup() {
    const { locale } = useI18n()
    const isDark = useDark()
    watch(() => isDark.value, (newVal) => {
      if (newVal)
        document.body.setAttribute('arco-theme', 'dark')
      else
        document.body.removeAttribute('arco-theme')
    }, { immediate: true })

    const locales = {
      zh: zhCN,
      en: enUS,
    }
    const localeVal = computed(() => {
      return locales[locale.value] || enUS
    })

    return () => (
      <>
        <a-config-provider locale={localeVal.value}>
          <RouterView />
        </a-config-provider>
      </>
    )
  },
})
</script>
