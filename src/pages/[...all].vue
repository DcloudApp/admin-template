<i18n lang="json5">
  {
    en: {
      subtitle: "Whoops, this page is gone.～",
      BackHome:'Back To Home'
    },
    zh: {
      subtitle: "抱歉，页面不见了～",
      BackHome:'返回首页'
    }
  }
</i18n>

<script lang='jsx'>
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const back = () => {
      router.push({ path: '/' })
    }
    return () => (
      <>
        <div class="h-full w-full flex flex-col items-center justify-center">
          <a-result class="result" status="404" subtitle={t('subtitle')}> </a-result>
          <div class="operation-row">
            <a-button
              key="back"
              type="primary"
              onClick={() => {
                back()
              }}
            >
              {t('BackHome')}
            </a-button>
          </div>
        </div>
      </>
    )
  },
})
</script>

<route lang="json5">
  {
    meta: {
      layout: false,
      requiresAuth:false,
    }
  }
</route>
