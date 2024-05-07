<i18n lang="json5">
  {
    en: {
      pageTitle: "Admins",
      new:'New',
      edit:'Edit',
      delete:'Delete',
      search:'Search',
      searchNamePlaceholder:'Search Admins Name',
      searchEmailPlaceholder:'Search Admins Email',
      searchRolesPlaceholder:'Select Admins Roles',

      tableOperation:'Operation',
      tableCreated:'Created Time',
      tableRole:'Role',
      tableGuid:'Guid',
      tableEmail:'Email',
      tableId:'Id',

      "InfoNotification": "Info Notification",
      "deleteContent": "Are you sure you want to delete user {email}?",
    },
    zh: {
      pageTitle: "管理员",
      new:'新建',
      edit:'编辑',
      delete:'删除',
      search:'搜索',
      searchNamePlaceholder:'搜索管理员名称',
      searchEmailPlaceholder:'搜索管理员邮箱',
      searchRolesPlaceholder:'选择管理员角色',

      tableOperation:'操作',
      tableCreated:'创建时间',
      tableRole:'角色',
      tableGuid:'唯一标识',
      tableEmail:'邮箱',
      tableId:'编号',

      "InfoNotification": "信息通知",
      "deleteContent": "您确定要删除用户{email}吗?",

    }
  }
</i18n>

<script lang='jsx'>
import { Modal } from '@arco-design/web-vue'
import { onMounted } from 'vue'
import { adminIndex, roleGetAll } from '@/https/api/settingApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()

    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        page: 1,
        page_size: 20,
        count: 0,
        name: '',
        email: '',
        role: '',
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getTableList() {
      tableLoading.value = true
      const { code, data } = await adminIndex(searchForm.value)
      if (code === 200) {
        tableData.value = data.users
        searchForm.value.count = Number(data.count)

        tableLoading.value = false
      }
    }
    const roleAllList = ref([])
    async function getRoleGetAll() {
      const { code, data } = await roleGetAll()
      if (code === 200)
        roleAllList.value = data.roles
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
                {t('deleteContent', { email: _record.email })}
              </div>
            </>
          )
        },
        onBeforeOk: async (done) => {
          // 确认按钮
          const { code } = await roleDelete({ id: _record.id })
          if (code === 200) {
            done(true)
            getRoleIndex()
          }
          else {
            done(false)
          }
        },
      })
    }
    onMounted(() => {
      getRoleGetAll()
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
                  <a-row>
                    <a-col flex={1}>
                      <a-row gutter={16}>
                        <a-col span={8}>
                          <a-input
                            class="w-full"
                            v-model={searchForm.value.name}
                            placeholder={t('searchNamePlaceholder')}
                            allow-clear
                          />
                        </a-col>
                        <a-col span={8}>
                          <a-input
                            class="w-full"
                            v-model={searchForm.value.email}
                            placeholder={t('searchEmailPlaceholder')}
                            allow-clear
                          />
                        </a-col>
                        <a-col span={8}>
                          <a-select
                            v-model={searchForm.value.role}
                            placeholder={t('searchRolesPlaceholder')}
                            allow-clear
                          >
                            {roleAllList.value.map((item) => {
                              return (
                                <>
                                  <a-option value={item.id}>{item.name}</a-option>
                                </>
                              )
                            })}
                          </a-select>
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-divider class="h-32px" direction="vertical" />
                    <a-col flex="86px">
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
                  <a-button
                    v-hasPermi="['/v1/admin/create']"
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
                      'show-page-size': true,
                      'total': searchForm.value.count,
                      'current': searchForm.value.page,
                      'page-size': searchForm.value.page_size,
                    }}
                  >
                    {{

                      columns: () => {
                        return (
                          <>
                            <a-table-column title={t('tableId')} data-index="id" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableEmail')} data-index="email" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableGuid')} data-index="guid" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('tableRole')} data-index="user_role" ellipsis tooltip>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    {roleAllList.value.find(item => item.id === record.user_role)?.name}
                                  </>
                                )
                              },

                              }}
                            </a-table-column>
                            <a-table-column title={t('tableCreated')} data-index="created_at" ellipsis tooltip></a-table-column>
                            <a-table-column align="center" fixed="right" width={130} title={t('tableOperation')}>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content={t('edit')}>
                                      <a-button
                                        v-hasPermi="['/v1/admin/edit']"
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
                                        v-hasPermi="['/v1/admin/delete']"
                                        type="text"
                                        shape="circle"
                                        status="danger"
                                        onClick={() => {
                                          deleteDialog(JSON.parse(JSON.stringify(record)))
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
    name: 'Admins',
    meta: {
      requiresAuth:true,
    }
  }
</route>
