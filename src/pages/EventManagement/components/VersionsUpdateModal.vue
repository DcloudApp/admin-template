<i18n lang="json5">
  {
    en: {
      VersionsUpdate:'Versions Update',
      required:'{name} is required',
      version:'version',
      placeholderVersion:'Please enter version',
      deviceType:'device type',
      placeholderDeviceType:'Please select device type',
      force_update_message:'Please enter force update message',
      update_message:'Please enter update message',
    },
    zh: {
      VersionsUpdate:'版本更新',
      required:'{name}是必填项',
      version:'版本号',
      placeholderVersion:'请输入版本号',
      deviceType:'设备类型',
      placeholderDeviceType:'请选择设备类型',
      force_update_message:'请输入强制更新消息',
      update_message:'请输入更新消息',
    }
  }
</i18n>

<script lang='jsx'>
import { versionsCreate, versionsEdit } from '@/https/api/userEventManagementApi'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  emits: ['update:show', 'success'],
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

    const deviceTypeList = ref([
      {
        name: 'Ios',
        value: 'ios',
      },
      {
        name: 'Android',
        value: 'android',
      },
    ])
    const formRef = ref(null)
    const generateFormModel = () => {
      return {
        id: '',
        version: '',
        device_type: '',
        status: '',
        force_update_message: '',
        update_message: '',
      }
    }

    const formModel = ref(generateFormModel())
    watch(() => visible.value, () => {
      if (props.value) {
        Object.keys(formModel.value).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(props.value, key))
            formModel.value[key] = props.value[key]
        })
      }
      else {
        formModel.value = generateFormModel()
      }
    })

    return () => (
      <>
        <a-modal
          v-model:visible={visible.value}
          title={t('VersionsUpdate')}
          unmountOnClose
          onBeforeOk={async (done) => {
            try {
              const isValid = await formRef.value.validate()

              if (isValid) {
                done(false)
                return
              }

              const formValue = formModel.value
              const { code } = formValue.id ? await versionsEdit(formValue) : await versionsCreate(formValue)

              if (code === 200) {
                emit('success')
                done(true)
              }
              else {
                done(false)
              }
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
              field="version"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('version') })}` }]}
            >
              <a-input
                v-model={formModel.value.version}
                placeholder={t('placeholderVersion')}
                max-length={30}
                allow-clear
                show-word-limit
              />
            </a-form-item>
            <a-form-item
              field="device_type"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: t('deviceType') })}` }]}
            >
              <a-select
                v-model={formModel.value.device_type}
                placeholder={t('placeholderDeviceType')}
                allow-clear
              >
                {deviceTypeList.value.map((item) => {
                  return (
                    <>
                      <a-option value={item.value}>{item.name}</a-option>
                    </>
                  )
                })}
              </a-select>
            </a-form-item>
            <a-form-item field="update_message" hide-label>
              <a-textarea v-model={formModel.value.update_message} placeholder={t('update_message')} allow-clear />
            </a-form-item>
            <a-form-item field="force_update_message" hide-label>
              <a-textarea v-model={formModel.value.force_update_message} placeholder={t('force_update_message')} allow-clear />
            </a-form-item>
          </a-form>
        </a-modal>
      </>
    )
  },
})
</script>
