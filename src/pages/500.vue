<i18n lang="json5">
  {
    en: {
      subtitle: "Sorry, there's a problem with the server～",
      BackHome:'Back To Home'
    },
    zh: {
      subtitle: "抱歉，服务器出了点问题～",
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
          <a-result class="result" status="500" subtitle={t('subtitle')}> </a-result>
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
