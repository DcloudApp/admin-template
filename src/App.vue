<script  lang='jsx'>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    const { locale } = useI18n()

    const locales = {
      zh: zhCN,
      en: enUS,
    }
    const localeVal = computed(() => {
      return locales[locale.value] || enUS
    })

    return () => (
      <>
        <a-config-provider global={true} update-at-scroll={true} locale={localeVal.value}>
          <RouterView />
        </a-config-provider>
      </>
    )
  },
})
</script>
