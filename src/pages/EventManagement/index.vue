<i18n lang="json5">
  {
    en: {
      pageTitle: "Event management",
      new:'New',
      edit:'Edit',

      deviceType:'Device Type',
      version:'Version',
      forceUpdateMessage:"force Update Message",
      updateMessage:"update Message",
      CreatedTime:'Created Time',
      Operation:'Operation',

    },
    zh: {
      pageTitle: "事件管理",
      new:'新建',
      edit:'编辑',

      deviceType:'设备类型',
      version:'版本号',
      forceUpdateMessage:"强制更新消息",
      updateMessage:"更新消息",
      CreatedTime:'创建时间',
      Operation:'操作',

    }
  }
</i18n>

<script lang='jsx'>
import { onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { versionsIndex } from '@/https/api/userEventManagementApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const { width } = useWindowSize()

    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        page: 1,
        page_size: 20,
        count: 0,
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getTableList() {
      tableLoading.value = true
      const { code, data } = await versionsIndex(searchForm.value)
      if (code === 200) {
        tableData.value = data.version
        searchForm.value.count = Number(data.count)
        tableLoading.value = false
      }
    }

    function addOrEditDialog() {
      //
    }

    onMounted(() => {
      getTableList()
    })

    return () => (
      <>
        <a-card title={t('pageTitle')} class="general-card" bordered={false}>
          {{
            extra: () => {
              return (
                <>
                  <a-button
                    type="text"
                    shape="circle"
                    onClick={() => {
                      searchForm.value = generateSearchForm()
                      getTableList()
                    }}
                  >
                    <icon-refresh />
                  </a-button>

                </>
              )
            },
            default: () => {
              return (
                <>
                  <a-button
                    type="primary"
                    onClick={() => {
                      addOrEditDialog()
                    }}
                  >
                    {{ icon: () => {
                      return (
                        <>
                          <icon-plus />
                        </>
                      )
                    }, default: () => {
                      return <div>{t('new')}</div>
                    } }}
                  </a-button>
                  <a-divider />
                  <a-table
                    data={tableData.value}
                    loading={tableLoading.value}
                    bordered={false}
                    row-key="id"
                    onPageChange={(page) => {
                      searchForm.value.page = page
                      getTableList()
                    }}
                    onPageSizeChange={(pageSize) => {
                      searchForm.value.page_size = pageSize
                      getTableList()
                    }}
                    pagination={{
                      'show-total': true,
                      'show-page-size': width.value > 430,
                      'simple': width.value < 960,
                      'total': searchForm.value.count,
                      'current': searchForm.value.page,
                      'pageSize': searchForm.value.page_size,
                    }}
                  >
                    {{ columns: () => {
                      return (
                        <>
                          <a-table-column title={t('deviceType')} data-index="device_type" ellipsis tooltip></a-table-column>
                          <a-table-column title={t('version')} data-index="version" ellipsis tooltip></a-table-column>
                          <a-table-column title={t('forceUpdateMessage')} data-index="force_update_message" ellipsis tooltip></a-table-column>
                          <a-table-column title={t('updateMessage')} data-index="update_message" ellipsis tooltip></a-table-column>
                          <a-table-column title={t('CreatedTime')} data-index="created_at" ellipsis tooltip></a-table-column>
                          <a-table-column align="center" fixed="right" width={130} title={t('Operation')}>
                            {{ cell: ({ record }) => {
                              return (
                                <>
                                  <a-tooltip content={t('edit')}>
                                    <a-button
                                      type="text"
                                      shape="circle"
                                      onClick={() => {
                                        addOrEditDialog(record, t('edit'))
                                      }}
                                    >
                                      <icon-pen />
                                    </a-button>
                                  </a-tooltip>
                                </>
                              )
                            },
                            }}
                          </a-table-column>
                        </>
                      )
                    },
                    }}
                  </a-table>
                </>
              )
            },
          }}

        </a-card>

      </>
    )
  },
})
</script>

<route lang="json5">
  {
    name: 'EventManagement',
    meta: {
      requiresAuth:true,
    }
  }
</route>
