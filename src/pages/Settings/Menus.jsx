// @unocss-include
import { Modal } from '@arco-design/web-vue'
import { menuIndex } from '@/https/api/setting'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const menuText = {
      1: { title: 'Catalogue', color: 'green' },
      2: { title: 'Menu', color: 'orange' },
      3: { title: 'Button', color: 'blue' },
    }
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

    getMenuIndex()

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
        title: 'Info Notification',
        hideCancel: false,
        okText: 'Confirm',
        cancelText: 'Cancel',
        content: () => {
          return (
            <>
              <div className="w-full flex items-center justify-center">
                Are you sure you want to delete it?
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

    return () => (
      <>
        <a-card title="Menus" class="general-card" bordered={false}>
          {{
            extra: () => {
              return (
                <>
                  <a-button
                    type="text"
                    shape="circle"
                    onClick={() => {
                      generateSearchForm()
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
                          return <div>新建</div>
                        } }}
                      </a-button>
                    </a-col>
                    <a-col class="ml-auto flex gap-2" xs={24} md={24} lg={7}>
                      <a-input
                        class="w-full"
                        v-model={searchForm.value.name}
                        placeholder="Search Menu Name"
                        allow-clear
                      />
                      <a-button type="primary">
                        {{ icon: () => {
                          return (
                            <>
                              <icon-search />
                            </>
                          )
                        }, default: () => {
                          return <div>搜索</div>
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
                    scrollbar={{ x: 2000, y: 200 }}
                  >
                    {{

                      columns: () => {
                        return (
                          <>
                            <a-table-column title="type" ellipsis tooltip>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tag color={menuText[record.type].color}>
                                      {menuText[record.type].title}
                                    </a-tag>
                                  </>
                                )
                              },
                              }}
                            </a-table-column>
                            {/* <a-table-column title="sort" data-index="sort" ellipsis tooltip></a-table-column> */}
                            <a-table-column title="name" data-index="name" ellipsis tooltip></a-table-column>
                            <a-table-column title="icon" data-index="icon" ellipsis tooltip>
                              {{
                                cell: ({ record }) => {
                                  return <div className={`i-${record.icon}`}></div>
                                },
                              }}
                            </a-table-column>
                            <a-table-column title="permission" data-index="perms" ellipsis tooltip></a-table-column>
                            <a-table-column title="path" data-index="path" ellipsis tooltip></a-table-column>
                            <a-table-column align="center" fixed="right" width={130} title="operation">
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content="Add">
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
                                    <a-tooltip content="Edit">
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
                                    <a-tooltip content="Delete">
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
        <a-modal v-model:visible={visibleDialog.value} title="Menus" okText="Confirm" cancelText="Cancel">
          <a-form model={formModel.value} layout="vertical">
            <a-form-item field="name" hide-label>
              <a-input v-model={formModel.value.name} placeholder="Name" />
            </a-form-item>
            <a-form-item hide-label>
              <a-radio-group v-model={formModel.value.type}>
                <a-radio value={1}>Catalogue</a-radio>
                <a-radio value={2}>Menu</a-radio>
                <a-radio value={3}>Button</a-radio>
              </a-radio-group>
            </a-form-item>
            {formModel.value.type !== 3 && (
              <a-form-item field="icon" hide-label>
                <a-select v-model={formModel.value.icon} placeholder="icon">
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
              <a-form-item field="perms" hide-label>
                <a-input v-model={formModel.value.perms} placeholder="perms" />
              </a-form-item>
            )}

            {formModel.value.type === 2 && (
              <a-form-item field="path" hide-label>
                <a-input v-model={formModel.value.path} placeholder="path" />
              </a-form-item>
            )}

            <a-form-item field="sort" hide-label>
              <a-input type="number" v-model={formModel.value.sort} placeholder="sort" />
            </a-form-item>
            <a-form-item field="hidden" hide-label>
              <a-switch type="round" v-model={formModel.value.hidden} />
              <div className="ml-2">Do you show him in the navigation bar?</div>
            </a-form-item>
          </a-form>
        </a-modal>

      </>
    )
  },
})
