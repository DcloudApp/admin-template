<i18n lang="json5">
  {
    en: {
      PushNotification:'Push Notification',
      required:'{name} is required',
      feedId:'id',
      placeholderFeedId:'Please enter feed id',
      feed_title:'title',
      placeholderFeed_title:'Please enter feed_title',
      feed_content:'content',
      placeholderFeed_content:'Please enter feed content',
      user:'user',
      placeholderUser:'Please enter user guid',

    },
    zh: {
      PushNotification:'推送通知',
      required:'{name}是必填项',
      feedId:'ID',
      placeholderFeedId:'请输入ID',
      feed_title:'标题',
      placeholderFeed_title:'请输入标题',
      feed_content:'内容',
      placeholderFeed_content:'请输入内容',
      user:'用户',
      placeholderUser:'请输入用户ID',

    }
  }
</i18n>

<script lang='jsx'>
import { onesignalFeed } from '@/https/api/userEventManagementApi'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const { t } = useI18n()

    const visible = computed({
      get: () => {
        return props.show
      },
      set: (val) => {
        emit('update:show', val)
      },
    })

    const formRef = ref(null)
    const generateFormModel = () => {
      return {
        feed_id: '',
        feed_title: '',
        feed_content: '',
        user: '',
      }
    }

    const formModel = ref(generateFormModel())

    return () => (
      <>
        <a-modal
          v-model:visible={visible.value}
          title={t('PushNotification')}
          unmountOnClose
          onClose={() => {
            formModel.value = generateFormModel()
          }}
          onBeforeOk={async (done) => {
            try {
              const isValid = await formRef.value.validate()

              if (isValid) {
                done(false)
                return
              }

              const formValue = formModel.value
              const { code } = await onesignalFeed(formValue)

              if (code === 200)
                done(true)
              else
                done(false)
            }
            catch (error) {
              done(false)
            }
          }}
        >
          <a-form
            ref={formRef}
            model={formModel.value}
            layout="vertical"
          >
            <a-form-item
              field="feed_id"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('feedId') })}` }]}
            >
              <a-input
                v-model={formModel.value.feed_id}
                placeholder={t('placeholderFeedId')}
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="feed_title"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('feed_title') })}` }]}
            >
              <a-input
                v-model={formModel.value.feed_title}
                placeholder={t('placeholderFeed_title')}
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="feed_content"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('feed_content') })}` }]}
            >
              <a-textarea v-model={formModel.value.feed_content} placeholder={t('placeholderFeed_content')} allow-clear />
            </a-form-item>
            <a-form-item
              field="user"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('user') })}` }]}
            >
              <a-textarea v-model={formModel.value.user} placeholder={t('placeholderUser')} allow-clear />
            </a-form-item>
          </a-form>
        </a-modal>
      </>
    )
  },
})
</script>
