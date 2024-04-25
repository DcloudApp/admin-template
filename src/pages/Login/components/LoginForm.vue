<script lang='jsx'>
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import useLoading from '@/hooks/loading'
import { useUserStore } from '@/stores/useUserStore'
import { app } from '@/themeConfig'
import { captcha } from '@/https/api/user'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()

    const loginForm = ref(null)
    const errorMessage = ref('')
    const formUserInfo = ref({
      username: 'gc@qq.com',
      password: 'Gc123456',
      verify_code: '',
    })
    const VerificationImg = ref('')
    async function getCaptcha() {
      formUserInfo.value.verify_code = ''
      const { code, data } = await captcha()
      if (code === 200)
        VerificationImg.value = data.captcha
    }
    getCaptcha()

    const handleSubmit = async () => {
      if (loading.value)
        return
      const errors = await loginForm.value.validate()
      if (!errors) {
        setLoading(true)
        try {
          await userStore.login(formUserInfo.value)
          router.push({ path: '/' })
          Message.success(t('login.form.login.success'))
        }
        catch (err) {
          errorMessage.value = err
          getCaptcha()
        }
        finally {
          setLoading(false)
        }
      }
    }
    return () => (
      <>
        <div className="w-330px flex flex-col">
          <div className="flex gap-2">
            <div className={`h-33px w-33px i-svg-logo ${app.logo}`} />
            <div className="mb-5 text-24px text-[var(--color-neutral-10)] font-500 leading-32px">
              { app.title }
            </div>
          </div>

          <div className="text-16px text-[var(--color-neutral-8)] leading-24px">
            {`Welcome to ${app.title}! 👋🏻`}
          </div>
          <div className="mb-5 text-16px text-[var(--color-neutral-8)] leading-24px">
            Please sign-in to your account and start the adventure
          </div>
          <div className="h-32px text-#f53f3f">{ errorMessage.value }</div>
          <a-form
            ref={loginForm}
            model={formUserInfo.value}
            onsubmit={() => {
              handleSubmit()
            }}
          >
            <a-form-item
              field="username"
              rules={[{ required: true, message: t('login.form.userName.errMsg') }]}
              validate-trigger={['change', 'blur']}
              hide-label
            >
              <a-input
                v-model={formUserInfo.value.username}
                placeholder={t('login.form.userName.placeholder')}
              >
                {{
                  prefix: () => {
                    return (
                      <>
                        <icon-user />
                      </>
                    )
                  },
                }}
              </a-input>
            </a-form-item>
            <a-form-item
              field="password"
              rules={[{ required: true, message: t('login.form.password.errMsg') }]}
              validate-trigger={['change', 'blur']}
              hide-label
            >
              <a-input-password
                v-model={formUserInfo.value.password}
                placeholder={t('login.form.password.placeholder')}
                allow-clear
              >
                {{
                  prefix: () => {
                    return (
                      <>
                        <icon-lock />
                      </>
                    )
                  },
                }}
              </a-input-password>
            </a-form-item>
            <a-form-item
              field="verify_code"
              rules={[{ required: true, message: t('login.form.verify_code.errMsg') }]}
              validate-trigger={['change', 'blur']}
              hide-label
            >
              <a-input
                v-model={formUserInfo.value.verify_code}
                placeholder={t('login.form.verify_code.placeholder')}
              >
              </a-input>
              <a-image
                class="mx-1 cursor-pointer"
                preview={false}
                src={VerificationImg.value}
                onClick={() => {
                  getCaptcha()
                }}
              />
            </a-form-item>
            <a-space size="16" direction="vertical">
              <a-button type="primary" html-type="submit" long loading={loading.value}>
                {t('login.form.login') }
              </a-button>
            </a-space>
          </a-form>
        </div>
      </>
    )
  },
})
</script>
