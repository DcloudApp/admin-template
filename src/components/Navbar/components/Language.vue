<script lang='jsx'>
import { loadLanguageAsync } from '@/locales/index'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const languageList = ref([
      {
        title: '简体中文',
        code: 'zh',
      },
      {
        title: 'English',
        code: 'en',
      },
    ])
    return () => (
      <>
        <a-dropdown trigger="click">
          {{
            default: () => {
              return (
                <>
                  <a-button
                    size="medium"
                    shape="circle"
                    status="normal"
                  >
                    {{
                      icon: () => {
                        return (
                          <>
                            <icon-language />
                          </>
                        )
                      },
                    }}
                  </a-button>
                </>
              )
            },
            content: () => {
              return (
                <>
                  {languageList.value.map((item) => {
                    return (
                      <>
                        <a-doption onClick={() => {
                          loadLanguageAsync(item.code)
                        }}
                        >
                          <a-space>
                            <span>
                              {item.title}
                            </span>
                          </a-space>
                        </a-doption>

                      </>
                    )
                  })}

                </>
              )
            },
          }}
        </a-dropdown>

      </>
    )
  },
})
</script>
