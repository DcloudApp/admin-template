<i18n lang="json5">
  {
    en: {
      pageTitle: "Admins",
      new:'New',
      view:'View',
      edit:'Edit',
      delete:'Delete',
      search:'Search',
      searchNamePlaceholder:'Search user Name',

      tableAvatar:'Avatar',
      tableUserName:'User Name',
      tableGuid:'Guid',
      tableStatus:'Status',
      tableGender:'Gender',
      tableIsHealer:'Is Healer',
      tableEmail:'Email',
      tableCellphone:'Cellphone',
      tableCreated:'Created Time',
      tableOperation:'Operation',

      "InfoNotification": "Info Notification",
      "deleteContent": "Are you sure you want to delete user {username}?",

      required:'{name} is required'

    },
    zh: {
      pageTitle: "管理员",
      new:'新建',
      view:'查看',
      edit:'编辑',
      delete:'删除',
      search:'搜索',
      searchNamePlaceholder:'搜索用户名称',

      tableAvatar:'头像',
      tableUserName:'用户名',
      tableGuid:'唯一标识',
      tableStatus:'状态',
      tableGender:'性别',
      tableIsHealer:'主播',
      tableEmail:'邮箱',
      tableCellphone:'手机号码',
      tableCreated:'创建时间',
      tableOperation:'操作',

      "InfoNotification": "信息通知",
      "deleteContent": "您确定要删除用户{username}吗?",
      required:'{name} 是必填项'

    }
  }
</i18n>

<script lang='jsx'>
import { onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { usersIndex } from '@/https/api/userManagementApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const { width } = useWindowSize()

    const is_healer = {
      0: { title: 'no', color: '' },
      1: { title: 'Yes', color: '' },
      2: { title: 'Applying', color: '' },
      3: { title: 'Refuse', color: '' },
    }
    const GenderGroup = {
      0: { title: 'Male', value: 0, color: '' },
      1: { title: 'Female', value: 1, color: '' },
      2: { title: 'Unknown', value: 2, color: '' },
      3: { title: 'Transsexuals', value: 3, color: '' },
    }
    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        page: 1,
        page_size: 20,
        count: 0,
        search_username: '',
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getTableList() {
      tableLoading.value = true
      const { code, data } = await usersIndex(searchForm.value)
      if (code === 200) {
        tableData.value = data.users
        searchForm.value.count = Number(data.count)
        tableLoading.value = false
      }
    }
    // 删除弹窗
    function deleteDialog(_record) {
      Modal.warning({
        width: 350,
        title: t('InfoNotification'),
        hideCancel: false,
        content: () => {
          return (
            <>
              <div className="w-full flex items-center justify-center text-center">
                {t('deleteContent', { username: _record.username })}
              </div>
            </>
          )
        },
        onBeforeOk: async (done) => {
          // 确认按钮
          // const { code } = await adminDelete({ id: _record.id })
          // if (code === 200) {
          //   done(true)
          //   getTableList()
          // }
          // else {
          //   done(false)
          // }
          setTimeout(() => {
            done(true)
          }, 3000)
        },
      })
    }
    onMounted(() => {
      getTableList()
    })

    return () => (
      <>
        <a-card title="UserManagement" class="general-card" bordered={false}>
          {{
            extra: () => {
              return (
                <>
                  <a-button
                    type="text"
                    shape="circle"
                    onClick={() => {
                      generateSearchForm()
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
                  <a-row class="gap-2">
                    <a-col xs={24} md={24} lg={2}>
                      <a-button
                        class="w-full"
                        type="primary"
                        onClick={() => {
                          addDialog()
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
                    </a-col>
                    <a-col class="ml-auto flex gap-2" xs={24} md={24} lg={7}>
                      <a-input
                        class="w-full"
                        v-model={searchForm.value.search_username}
                        placeholder={t('searchNamePlaceholder')}
                        allow-clear
                      />
                      <a-button
                        type="primary"
                        onClick={() => {
                          getTableList()
                        }}
                      >
                        {{ icon: () => {
                          return (
                            <>
                              <icon-search />
                            </>
                          )
                        }, default: () => {
                          return <div>{t('search')}</div>
                        } }}
                      </a-button>
                    </a-col>
                  </a-row>
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
                    scroll={{ x: 1400 }}
                    pagination={{
                      'show-total': true,
                      'show-page-size': width.value > 430,
                      'simple': width.value < 960,
                      'total': searchForm.value.count,
                      'current': searchForm.value.page,
                      'pageSize': searchForm.value.page_size,

                    }}
                  >
                    {{

                      columns: () => {
                        return (
                          <>
                            <a-table-column width={80} title={t('tableAvatar')} ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return (
                                    <>
                                      <a-avatar
                                        imageUrl={record.avatar}
                                      >
                                      </a-avatar>
                                    </>
                                  )
                                },
                              }}
                            </a-table-column>
                            <a-table-column title={t('tableUserName')} data-index="username" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableGuid')} data-index="guid" ellipsis tooltip></a-table-column>
                            <a-table-column width={100} title={t('tableStatus')} ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return (
                                    <>
                                      <a-tag color={record.status === 'deleted' ? 'red' : 'green'}>{record.status }</a-tag>
                                    </>
                                  )
                                },
                              }}
                            </a-table-column>
                            <a-table-column width={100} title={t('tableGender')} ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return (
                                    <>
                                      <a-tag color={GenderGroup[record.gender]?.color || ''}>{GenderGroup[record.gender]?.title ?? 'Other' }</a-tag>
                                    </>
                                  )
                                },
                              }}
                            </a-table-column>
                            <a-table-column width={100} title={t('tableIsHealer')} ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return (
                                    <>
                                      <a-tag color={is_healer[record.is_healer].color}>{is_healer[record.is_healer].title}</a-tag>
                                    </>
                                  )
                                },
                              }}
                            </a-table-column>
                            <a-table-column title={t('tableEmail')} data-index="email" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableCellphone')} data-index="cellphone" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableCreated')} data-index="created_at" ellipsis tooltip></a-table-column>
                            <a-table-column align="center" fixed="right" width={130} title={t('tableOperation')}>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content={t('view')}>
                                      <a-button
                                        type="text"
                                        shape="circle"
                                        onClick={() => {
                                          addDialog(JSON.parse(JSON.stringify(record)))
                                        }}
                                      >
                                        <icon-eye />
                                      </a-button>
                                    </a-tooltip>
                                    <a-tooltip content={t('edit')}>
                                      <a-button
                                        type="text"
                                        shape="circle"
                                        onClick={() => {
                                          editDialog(JSON.parse(JSON.stringify(record)))
                                        }}
                                      >
                                        <icon-pen />
                                      </a-button>
                                    </a-tooltip>
                                    <a-tooltip content={t('delete')}>
                                      <a-button
                                        type="text"
                                        shape="circle"
                                        status="danger"
                                        onClick={() => {
                                          deleteDialog(record)
                                        }}
                                      >
                                        <icon-delete />
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
    name: 'UserManagement',
    meta: {
      requiresAuth:true,
    }
  }
</route>
