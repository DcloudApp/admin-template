<i18n lang="json5">
  {
    en: {
      pageTitle: "Menus",
      new:'New',
      edit:'Edit',
      delete:'Delete',
      search:'Search',
      searchName:'Search Menu Name',
      type:'Type',
      name:'Name',
      sort:'sort',
      icon:'Icon',
      permission:'Permission',
      path:'Path',
      operation:'Operation',
      catalogue:'Catalogue',
      menu:'Menu',
      button:'Button',
      formModelPlaceholderName:'Please enter name',
      formModelPlaceholderIcon:'Please select icon',
      formModelPlaceholderPerms:'Please enter permission',
      formModelPlaceholderPath:'Please enter the routing path',
      formModelPlaceholderSort:'Please enter sort',
      formModelIsHidden:'Is it displayed in the navigation bar?',
      "InfoNotification": "Info Notification",
      "deleteContent": "Are you sure you want to delete it?",
    },
    zh: {
      pageTitle: "菜单",
      new:'新建',
      edit:'编辑',
      delete:'删除',
      search:'搜索',
      searchName:'搜索菜单名称',
      type:'类型',
      name:'名称',
      sort:'排序',
      icon:'图标',
      permission:'权限',
      path:'路径',
      operation:'操作',
      catalogue:'目录',
      menu:'菜单',
      button:'按钮',
      formModelPlaceholderName:'请输入名称',
      formModelPlaceholderIcon:'请选择图标',
      formModelPlaceholderPerms:'请输入权限',
      formModelPlaceholderPath:'请输入路由路径',
      formModelPlaceholderSort:'请输入排序',
      formModelIsHidden:'是否在导航栏中显示？',
      "InfoNotification": "信息通知",
      "deleteContent": "您确定要删除它吗?",
    }
  }
</i18n>

<script lang='jsx'>
import { Modal } from '@arco-design/web-vue'
import { onMounted, watch } from 'vue'
import { menuIndex } from '@/https/api/settingApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const menuText = ref([{ title: 'catalogue', value: 1, color: 'green' }, { title: 'menu', value: 2, color: 'orange' }, { title: 'button', value: 3, color: 'blue' }])
    const MenuIcon = ref([
      'tabler-smart-home',
      'tabler-settings',
      'tabler-users',
      'tabler:certificate',
      'tabler:align-box-center-stretch',
      'material-symbols:shopping-bag-outline',
      'tabler:exposure-off',
      'icon-park-outline:theme',
      'material-symbols:directions-car-outline',
      'octicon:broadcast-24',
      'ri:team-line',
      'material-symbols:featured-play-list-outline-sharp',
      'icon-park-outline:folder-withdrawal',
      'material-symbols:content-paste-search',
      'material-symbols:person-2-outline',
      'tabler:building-community',
      'material-symbols:event-list-outline',
      'ci:tag-outline',
      'carbon:recommend',
    ])

    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        name: '',
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getMenuIndex() {
      tableLoading.value = true
      const { code, data } = await menuIndex()
      if (code === 200) {
        tableData.value = data.menus
        tableLoading.value = false
      }
    }

    // 搜索
    function recursiveSearch(query, dataArray) {
      const results = []
      for (const item of dataArray) {
        // 使用正则表达式进行模糊匹配
        const regex = new RegExp(query, 'i')
        // 如果当前节点的 name 字段匹配，则加入结果中
        if (regex.test(item.name))
          results.push(item)

        // 如果有子节点，则递归搜索子节点
        if (item.children && item.children.length > 0) {
          const childResults = recursiveSearch(query, item.children)
          results.push(...childResults)
        }
      }
      return results
    }

    function searchName() {
      if (searchForm.value.name) {
        tableLoading.value = true
        tableData.value = recursiveSearch(searchForm.value.name, tableData.value)
        tableLoading.value = false
      }
    }
    watch(() => searchForm.value.name, (newVal) => {
      if (!newVal)
        getMenuIndex()
    })

    const formRef = ref(null)
    const generateFormModel = () => {
      return {
        parent_id: 0,
        name: '',
        type: 1,
        icon: '',
        perms: '',
        path: '',
        sort: '',
        hidden: false,
      }
    }
    const formModel = ref(generateFormModel())
    // 新增弹窗
    const visibleDialog = ref(false)
    function addDialog(_record) {
      formModel.value = generateFormModel()
      if (_record && _record.id)
        formModel.value.parent_id = _record.id
      visibleDialog.value = true
    }
    // 修改弹窗
    function editDialog(_record) {
      formModel.value = generateFormModel()
      formModel.value = _record
      formModel.value.sort = `${_record.sort}`
      visibleDialog.value = true
    }
    // 删除弹窗
    function deleteDialog(_record) {
      Modal.info({
        width: 350,
        title: t('InfoNotification'),
        hideCancel: false,
        content: () => {
          return (
            <>
              <div className="w-full flex items-center justify-center">
                {t('deleteContent')}
              </div>
            </>
          )
        },
        onOk: () => {
          // 确认按钮
          // console.log(record.id)
        },
      })
    }

    onMounted(() => {
      getMenuIndex()
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
                      getMenuIndex()
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
                        v-model={searchForm.value.name}
                        placeholder={t('searchName')}
                        allow-clear
                      />
                      <a-button type="primary" onClick={() => { searchName() }}>
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
                    pagination={false}
                    scrollbar={true}
                    scroll={{
                      x: '100%',
                      y: '100%',
                    }}
                  >
                    {{
                      'expand-icon': ({ expanded }) => {
                        return <>{expanded ? <icon-down /> : <icon-right />}</>
                      },
                      'columns': () => {
                        return (
                          <>
                            <a-table-column width={50}></a-table-column>
                            <a-table-column title={t('type')} ellipsis tooltip>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tag color={menuText.value.find(item => item.value === record.type).color}>
                                      {t(menuText.value.find(item => item.value === record.type).title) }
                                    </a-tag>
                                  </>
                                )
                              },
                              }}
                            </a-table-column>
                            {/* <a-table-column title={t('sort')} data-index="sort" ellipsis tooltip></a-table-column> */}
                            <a-table-column title={t('name')} data-index="name" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('icon')} data-index="icon" ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return <div className={`i-${record.icon}`}></div>
                                },
                              }}
                            </a-table-column>
                            <a-table-column title={t('permission')} data-index="perms" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('path')} data-index="path" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('operation')} align="center" fixed="right" width={130}>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content={t('new')}>
                                      <a-button
                                        type="text"
                                        shape="circle"
                                        onClick={() => {
                                          addDialog(JSON.parse(JSON.stringify(record)))
                                        }}
                                      >
                                        <icon-plus />
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
        {/* 弹窗 */}
        <a-modal
          v-model:visible={visibleDialog.value}
          title={t('pageTitle')}
          onBeforeOk={(done) => {
            formRef.value.validate()
              .then((res) => {
                if (res) {
                  done(false)
                }
                else {
                  setTimeout(() => {
                    done(true)
                  }, 3000)
                }
              })
              .catch(_error => done(false))
          }}
          unmountOnClose
        >
          <a-form
            ref={formRef}
            model={formModel.value}
            layout="vertical"
          >
            <a-form-item field="name" hide-label validate-trigger="blur" required>
              <a-input v-model={formModel.value.name} placeholder={t('formModelPlaceholderName')} />
            </a-form-item>
            <a-form-item hide-label>
              <a-radio-group
                v-model={formModel.value.type}
                onChange={() => {
                  formRef.value.clearValidate()
                }}
              >
                {menuText.value.map((item) => {
                  return (
                    <>
                      <a-radio value={item.value}>{t(item.title)}</a-radio>
                    </>
                  )
                })}
              </a-radio-group>
            </a-form-item>
            {formModel.value.type !== 3 && (
              <a-form-item field="icon" hide-label validate-trigger="blur" required>
                <a-select
                  v-model={formModel.value.icon}
                  placeholder={t('formModelPlaceholderIcon')}
                >
                  {{
                    label: () => (
                      <div className="flex items-center gap-1">
                        <div className={`i-${formModel.value.icon}`}></div>
                        {formModel.value.icon}
                      </div>
                    ),
                    default: () => (
                      <>
                        {MenuIcon.value.map(item => (
                          <a-option value={item}>
                            <div className="flex items-center gap-1">
                              <div className={`i-${item}`}></div>
                              {item}
                            </div>
                          </a-option>
                        ))}
                      </>
                    ),
                  }}
                </a-select>
              </a-form-item>
            )}

            {formModel.value.type !== 1 && (
              <a-form-item field="perms" hide-label validate-trigger="blur" required>
                <a-input v-model={formModel.value.perms} placeholder={t('formModelPlaceholderPerms')} />
              </a-form-item>
            )}

            {formModel.value.type === 2 && (
              <a-form-item field="path" hide-label validate-trigger="blur" required>
                <a-input v-model={formModel.value.path} placeholder={t('formModelPlaceholderPath')} />
              </a-form-item>
            )}

            <a-form-item field="sort" hide-label validate-trigger="blur" required>
              <a-input type="number" v-model={formModel.value.sort} placeholder={t('formModelPlaceholderSort')} />
            </a-form-item>
            <a-form-item field="hidden" hide-label>
              <a-switch type="round" v-model={formModel.value.hidden} />
              <div className="ml-2">{t('formModelIsHidden')}</div>
            </a-form-item>
          </a-form>
        </a-modal>

      </>
    )
  },
})
</script>

<route lang="json5">
  {
    name: 'Menus',
    meta: {
      requiresAuth:true,
    }
  }
</route>
