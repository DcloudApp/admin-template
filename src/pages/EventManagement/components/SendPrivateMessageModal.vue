<i18n lang="json5">
  {
    en: {
      SendPrivateMessage:'Send Private Message',
      required:'{name} is required',
      senderGuid:'sender guid',
      placeholderSenderGuid:'Please enter sender guid',
      guid:'guid',
      placeholderGuid:'Please enter guid',
      content:'content',
      placeholderContent:'Please enter content'
    },
    zh: {
      SendPrivateMessage:'发送私信',
      required:'{name}是必填项',
      senderGuid:'发送方的唯一标识符',
      placeholderSenderGuid:'请输入发送方的唯一标识符',
      guid:'唯一标识符',
      placeholderGuid:'请输入唯一标识符',
      content:'内容',
      placeholderContent:'请输入内容'

    }
  }
</i18n>

<script lang='jsx'>
import { usersPrivateMsg } from '@/https/api/userEventManagementApi'

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
        sender_guid: '',
        guid: '',
        content: '',
      }
    }
    const formModel = ref(generateFormModel())
    return () => (
      <>
        <a-modal
          v-model:visible={visible.value}
          title={t('SendPrivateMessage')}
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
              const { code } = await usersPrivateMsg(formValue)

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
              field="sender_guid"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('senderGuid') })}` }]}
            >
              <a-input
                v-model={formModel.value.sender_guid}
                placeholder={t('placeholderSenderGuid')}
                allow-clear
              />
            </a-form-item>

            <a-form-item
              field="guid"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('guid') })}` }]}
            >
              <a-textarea v-model={formModel.value.guid} placeholder={t('placeholderGuid')} allow-clear />
            </a-form-item>
            <a-form-item
              field="content"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('content') })}` }]}
            >
              <a-textarea v-model={formModel.value.content} placeholder={t('placeholderContent')} allow-clear />
            </a-form-item>
          </a-form>
        </a-modal>
      </>
    )
  },
})
</script>
