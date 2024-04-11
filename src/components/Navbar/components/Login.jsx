import { useRouter } from 'vue-router'
import { clearToken } from '@/utils/auth'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    return () => (
      <>
        <a-dropdown trigger="click">
          {{
            default: () => {
              return (
                <>
                  <a-avatar
                    size={32}
                    class="cursor-pointer"
                    imageUrl=""
                  >
                    A
                  </a-avatar>
                </>
              )
            },
            content: () => {
              return (
                <>
                  <a-doption>
                    <a-space>
                      <icon-tag />
                      <span>
                        {t('switchRoles')}
                      </span>
                    </a-space>
                  </a-doption>
                  <a-doption>
                    <a-space>
                      <icon-user />
                      <span>
                        {t('userCenter')}
                      </span>
                    </a-space>
                  </a-doption>
                  <a-doption>
                    <a-space>
                      <icon-settings />
                      <span>
                        {t('userSettings')}
                      </span>
                    </a-space>
                  </a-doption>
                  <a-doption>
                    <a-space onClick={() => {
                      clearToken()
                      router.push('/login')
                    }}
                    >
                      <icon-export />
                      <span>
                        {t('logout')}
                      </span>
                    </a-space>
                  </a-doption>
                </>
              )
            },
          }}
        </a-dropdown>

      </>
    )
  },
})
