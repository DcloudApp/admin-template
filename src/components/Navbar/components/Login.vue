<i18n lang="json5">
  {
    en: {
      "userSettings": "User Settings",
      "logout": "Logout",
      "InfoNotification": "Info Notification",
      "logOutContent": "Are you sure you want to logout?",

    },
    zh: {
      "userSettings": "用户设置",
      "logout": "登出登录",
      "InfoNotification": "信息通知",
      "logOutContent": "您确定要退出登录吗？",

    }
  }
</i18n>

<script lang='jsx'>
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/stores/usePermissionStore'
import { clearToken } from '@/utils/auth'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const usePermissionStores = usePermissionStore()

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
                      <icon-settings />
                      <span>
                        {t('userSettings')}
                      </span>
                    </a-space>
                  </a-doption>
                  <a-doption>
                    <a-space onClick={() => {
                      Modal.warning({
                        width: 350,
                        title: t('InfoNotification'),
                        hideCancel: false,
                        content: () => {
                          return (
                            <>
                              <div className="w-full flex items-center justify-center text-center">
                                {t('logOutContent')}
                              </div>
                            </>
                          )
                        },
                        onOk: () => {
                          router.push('/login')
                          usePermissionStores.reset()
                          clearToken()
                        },
                      })
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
</script>
