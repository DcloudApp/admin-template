<i18n lang="json5">
  {
    en: {
      subtitle: "Sorry, you do not have permission to access this resource～",
      BackHome:'Back To Home'
    },
    zh: {
      subtitle: "对不起，您没有访问该资源的权限～",
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
          <a-result class="result" status="403" subtitle={t('subtitle')}> </a-result>
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
