<i18n lang="json5">
  {
    en: {
      pageTitle: "User management",
      new:'New',
      view:'View',
      edit:'Edit',
      delete:'Delete',
      search:'Search',
      reset:'Reset',
      searchNamePlaceholder:'Enter user Name',
      searchGuidPlaceholder:'Enter user guid',
      searchRegisteredPlaceholder:'Select registered source',
      searchEmailPlaceholder:'Enter user email',
      searchPhonePlaceholder:'Enter user phone',
      advancedFilter:'Filter',

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
      InviteCode:'Invite Code',

      "InfoNotification": "Info Notification",
      "deleteContent": "Are you sure you want to delete user {username}?",
      required:'{name} is required',

      dialogTitle:'{title} user',
      formModelPlaceholderUserName:'Enter user name',
      formModelPlaceholderCellphoneNumber:'Enter user cellphone',
      formModelPlaceholderEmail:'Enter user email',

    },
    zh: {
      pageTitle: "用户管理",
      new:'新建',
      view:'查看',
      edit:'编辑',
      delete:'删除',
      search:'搜索',
      reset:'重置',
      searchNamePlaceholder:'输入用户名称',
      searchGuidPlaceholder:'输入用户唯一标识',
      searchRegisteredPlaceholder:'选择注册源',
      searchEmailPlaceholder:'输入用户邮箱',
      searchPhonePlaceholder:'输入用户手机号码',
      advancedFilter:'高级筛选',

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
      InviteCode:'邀请码',

      "InfoNotification": "信息通知",
      "deleteContent": "您确定要删除用户{username}吗?",
      required:'{name} 是必填项',

      dialogTitle:'{title}用户',
      formModelPlaceholderUserName:'输入用户名称',
      formModelPlaceholderCellphoneNumber:'输入用户手机号码',
      formModelPlaceholderEmail:'输入用户邮箱',

    }
  }
</i18n>

<script lang='jsx'>
import { onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { filesUpload, usersDelete, usersIndex, usersSave } from '@/https/api/userManagementApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const { width } = useWindowSize()

    const is_healer = [
      { title: 'no', value: '0', color: '' },
      { title: 'Yes', value: '1', color: '' },
      { title: 'Applying', value: '2', color: '' },
      { title: 'Refuse', value: '3', color: '' },
    ]
    const GenderGroup = [
      { title: 'Male', value: '0', color: '' },
      { title: 'Female', value: '1', color: '' },
      { title: 'Unknown', value: '2', color: '' },
      { title: 'Transsexuals', value: '3', color: '' },
    ]
    const registeredList = [
      { title: 'web', value: 1 },
      { title: 'app', value: 2 },
      { title: 'test', value: 4 },
      { title: 'crawler', value: 5 },
    ]
    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        page: 1,
        page_size: 20,
        count: 0,
        search_username: '',
        search_guid: '',
        from_type: '',
        search_email: '',
        search_phone: '',
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
          const { code } = await usersDelete({ guid: _record.guid })
          if (code === 200) {
            done(true)
            getTableList()
          }
          else {
            done(false)
          }
        },
      })
    }
    //  弹窗
    const visibleDialog = ref(false)
    const formRef = ref(null)
    const countryCodeList = ref([
      '+86',
      '+55',
    ])

    const generateFormModel = () => {
      return {
        guid: '',
        username: '',
        avatar: '',
        fileList: [],
        srcList: [],
        country_code: '+86',
        cellphone_number: '',
        email: '',
      }
    }
    const formModel = ref(generateFormModel())
    const dialogTitle = ref(t('new'))

    // 查看弹窗
    const viewDialogForm = ref(null)
    const showViewDialog = ref(false)
    function viewDialog(_record, title = t('new')) {
      dialogTitle.value = title
      viewDialogForm.value = JSON.parse(JSON.stringify(_record))
      showViewDialog.value = true
    }

    // 新增弹窗 修改弹窗
    function addOrEditDialog(_record, title = t('new')) {
      dialogTitle.value = title
      formModel.value = generateFormModel()
      if (_record && _record.guid) {
        Object.keys(formModel.value).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(_record, key))
            formModel.value[key] = _record[key]
        })
        formModel.value.srcList = [formModel.value.avatar]
      }
      visibleDialog.value = true
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
                  <div className="w-full flex flex-col gap-5 md:flex-row md:gap-0">
                    <div className="flex flex-1 flex-col gap-5">
                      <div className="flex flex-1 flex-col gap-5 md:flex-row">
                        <a-input
                          class="w-full"
                          v-model={searchForm.value.search_username}
                          placeholder={t('searchNamePlaceholder')}
                          allow-clear
                        />
                        <a-input
                          class="w-full"
                          v-model={searchForm.value.search_guid}
                          placeholder={t('searchGuidPlaceholder')}
                          allow-clear
                        />
                        <a-select
                          v-model={searchForm.value.from_type}
                          placeholder={t('searchRegisteredPlaceholder')}
                          allow-clear
                        >
                          {registeredList.map((item) => {
                            return (
                              <>
                                <a-option value={item.value}>{item.title}</a-option>
                              </>
                            )
                          })}
                        </a-select>
                      </div>
                    </div>
                    <a-divider class="hidden md:inline-block" direction="vertical" />
                    <div className="relative flex gap-2">
                      <a-dropdown trigger="click" position={width.value >= 678 ? 'br' : 'tl'}>
                        {{
                          default: () => {
                            return (
                              <>
                                <a-button
                                  type="outline"
                                >
                                  {{ icon: () => {
                                    return (
                                      <>
                                        <icon-find-replace />
                                      </>
                                    )
                                  }, default: () => {
                                    return <div>{t('advancedFilter')}</div>
                                  } }}

                                </a-button>
                              </>
                            )
                          },
                          content: () => {
                            return (
                              <>
                                <div className="w-278px flex flex-col gap-5 p-5 md:w-350px">
                                  <a-input
                                    v-model={searchForm.value.search_email}
                                    placeholder={t('searchEmailPlaceholder')}
                                    allow-clear
                                  />
                                  <a-input
                                    v-model={searchForm.value.search_phone}
                                    placeholder={t('searchPhonePlaceholder')}
                                    allow-clear
                                  />

                                </div>
                              </>
                            )
                          },
                        }}
                      </a-dropdown>

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
                    </div>
                  </div>

                  <a-divider />
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
                                      <a-tag color={GenderGroup.find(item => item.value === record.gender)?.color || ''}>
                                        {GenderGroup.find(item => item.value === record.gender)?.title || 'Other' }
                                      </a-tag>
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
                                      <a-tag color={is_healer.find(item => item.value === record.is_healer)?.color}>{is_healer.find(item => item.value === record.is_healer)?.title}</a-tag>
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
                                          viewDialog(record, t('view'))
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
                                          addOrEditDialog(record, t('edit'))
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
        {/* 新增编辑弹窗 */}
        <a-modal
          v-model:visible={visibleDialog.value}
          title={t('dialogTitle', { title: dialogTitle.value })}
          unmountOnClose
          onBeforeOk={async (done) => {
            try {
              const isValid = await formRef.value.validate()

              if (isValid) {
                done(false)
                return
              }

              const uploadPromises = formModel.value.fileList?.map(fileObj => filesUpload({ files: fileObj.file, type: 'avatar' }))
              if (uploadPromises.length > 0) {
                const data = await Promise.all(uploadPromises)
                data.forEach((item) => {
                  if (item.code === 200)
                    formModel.value.avatar = item.data.url
                })
              }

              const { code } = await usersSave(formModel.value)
              if (code === 200) {
                done(true)
                getTableList()
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
              field="srcList"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: 'Avatar' })}` }]}
            >
              <AppUpload title={t('tableAvatar')} v-model:srcList={formModel.value.srcList} v-model:fileList={formModel.value.fileList} />
            </a-form-item>
            <a-form-item
              field="username"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: 'User Name' })}` }]}
            >
              <a-input
                v-model={formModel.value.username}
                placeholder={t('formModelPlaceholderUserName')}
                max-length={30}
                allow-clear
                show-word-limit
              />
            </a-form-item>

            <a-form-item
              field="cellphone_number"
              hide-label
              validate-trigger="blur"
              rules={[{ required: true, message: `${t('required', { name: 'Cellphone' })}` }]}
            >

              <a-input-group class="w-full">
                <a-select class="w-90px" options={countryCodeList.value} v-model={formModel.value.country_code} />
                <a-input
                  class="flex-1"
                  v-model={formModel.value.cellphone_number}
                  placeholder={t('formModelPlaceholderCellphoneNumber')}
                  max-length={30}
                  allow-clear
                  show-word-limit
                >

                </a-input>
              </a-input-group>
            </a-form-item>
            <a-form-item
              field="email"
              hide-label
              validate-trigger="blur"
            >
              <a-input
                v-model={formModel.value.email}
                placeholder={t('formModelPlaceholderEmail')}
                max-length={30}
                allow-clear
                show-word-limit
              />
            </a-form-item>
          </a-form>
        </a-modal>
        {/* 查看弹窗 */}
        <a-modal
          v-model:visible={showViewDialog.value}
          title={t('dialogTitle', { title: dialogTitle.value })}
          unmountOnClose
          footer={false}
          modal-class="modalBodyClass"
        >
          {/* {JSON.stringify(viewDialogForm.value)} */}
          <div className="myScrollbar max-h-400px w-full flex flex-col gap-3 overflow-auto p-24px">
            <div className="w-full flex flex-col gap-1">
              <div>{`${t('tableAvatar')}:`}</div>
              <a-avatar
                imageUrl={viewDialogForm.value.avatar}
              >
              </a-avatar>
            </div>
            <div className="w-full flex flex-col gap-5 md:flex-row">
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>
                  {`${t('tableUserName')}:`}
                </div>
                <a-tag size="large">{viewDialogForm.value.username}</a-tag>
              </div>
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>
                  {`${t('tableGender')}:`}
                </div>
                <a-tag size="large">{GenderGroup.find(item => item.value === viewDialogForm.value.gender)?.title || 'Other'}</a-tag>
              </div>
            </div>

            <div className="w-full flex flex-col gap-5 md:flex-row">
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>{`${t('tableCellphone')}:`}</div>
                <a-tag size="large">{viewDialogForm.value.cellphone}</a-tag>
              </div>
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>{`${t('tableEmail')}:`}</div>
                <a-tag size="large">{viewDialogForm.value.email}</a-tag>
              </div>

            </div>
            <div className="w-full flex flex-col gap-5 md:flex-row">
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>{`${t('tableStatus')}:`}</div>
                <a-tag size="large">{viewDialogForm.value.status}</a-tag>
              </div>
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>{`${t('InviteCode')}:`}</div>
                <a-tag size="large"></a-tag>
              </div>

            </div>
            <div className="w-full flex flex-col gap-5 md:flex-row">
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>Vip Synastry:</div>
                <a-tag size="large"></a-tag>
              </div>
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>Estrela:</div>
                <a-tag size="large"></a-tag>
              </div>

            </div>
            <div className="w-full flex flex-col gap-5 md:flex-row">
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>Moeda:</div>
                <a-tag size="large"></a-tag>
              </div>
              <div className="w-full flex flex-col gap-1 md:w-50%">
                <div>Credits:</div>
                <a-tag size="large"></a-tag>
              </div>
            </div>
          </div>
        </a-modal>
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
