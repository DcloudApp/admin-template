<script lang='jsx'>
import { useFileDialog } from '@vueuse/core'
import { computed, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    max: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    srcList: {
      type: Array,
      default: () => {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  emits: ['update:srcList', 'update:fileList'],
  setup(props, { emit }) {
    const useFileDialogImage = useFileDialog({ accept: props.accept, multiple: props.multiple, max: props.max })

    const imageFileList = computed({
      get: () => {
        return props.fileList
      },
      set: (val) => {
        emit('update:fileList', val)
      },
    })
    const srcList = computed({
      get: () => {
        return props.srcList
      },
      set: (val) => {
        emit('update:srcList', val)
      },
    })

    useFileDialogImage.onChange((files) => {
      if (files.length > 0) {
        for (let index = 0; index < files.length; index++) {
          const item = files[index]
          const url = URL.createObjectURL(item)

          if (imageFileList.value.length < props.max) {
            imageFileList.value = [...imageFileList.value, { name: url, file: item }]

            srcList.value = [...srcList.value, url]
          }
        }
      }
    })
    function deleteImgFile(item, index) {
      imageFileList.value = imageFileList.value.filter(items => items.name !== item)
      srcList.value.splice(index, 1)
    }

    const visible = ref(false)
    const current = ref(3)
    onUnmounted(() => {
      // imageFileList.value.forEach((element) => {
      //   URL.revokeObjectURL(element.name)
      // })
    })
    return () => (
      <>
        <div class="arco-upload-wrapper arco-upload-wrapper-type-picture-card">
          <div class="arco-upload-list arco-upload-list-type-picture-card gap-8px">
            {srcList.value.map((item, index) => {
              return (
                <>
                  <span class="arco-upload-list-picture">
                    <a-image
                      class="h-full w-full"
                      fit="cover"
                      preview={false}
                      src={item}
                    />
                    <div class="arco-upload-list-picture-mask">
                      <div class="arco-upload-list-picture-operation">
                        <span class="arco-upload-icon arco-upload-icon-preview">
                          <icon-eye onClick={() => {
                            current.value = index
                            visible.value = true
                          }}
                          />
                        </span>
                        <span class="arco-upload-icon arco-upload-icon-remove">
                          <icon-delete onClick={() => {
                            deleteImgFile(item, index)
                          }}
                          />
                        </span>
                      </div>
                    </div>
                  </span>
                </>
              )
            })}

            <span class="arco-upload arco-upload-type-picture-card" v-show={srcList.value.length < props.max}>
              <div
                class="arco-upload-picture-card"
                onClick={() => {
                  useFileDialogImage.open()
                }}
              >
                <div class="arco-upload-picture-card-text flex flex-col items-center justify-center">
                  <icon-plus />
                  <span class="text-12px">{props.title}</span>
                </div>
              </div>
            </span>
          </div>
        </div>
        <a-image-preview-group
          v-model:visible={visible.value}
          v-model:current={current.value}
          infinite
          srcList={srcList.value}
        />
      </>
    )
  },
})
</script>

<style scoped>
:deep(.arco-upload-list-picture) {
  margin-right: 0;
  margin-bottom: 0;
}
</style>
