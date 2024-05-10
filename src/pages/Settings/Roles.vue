<i18n lang="json5">
  {
    en: {
      pageTitle: "Role management",
      new:'New',
      edit:'Edit',
      delete:'Delete',
      search:'Search',
      searchName:'Search Roles Name',
      name:'Name',
      description:'Description',
      operation:'Operation',

      formModelPlaceholderName:'Please enter a roles name',
      formModelPlaceholderSearchKey:'search menus name',
      formModelPlaceholderDescription:'Please enter a roles description',

      InfoNotification: "Info Notification",
      deleteContent: "Are you sure you want to delete roles {name}?",
      dialogTitle:'{title} Roles',
    },
    zh: {
      pageTitle: "角色管理",
      new:'新建',
      edit:'编辑',
      delete:'删除',
      search:'搜索',
      searchName:'搜索角色名称',
      name:'名称',
      description:'描述',
      operation:'操作',

      formModelPlaceholderName:'请输入角色名称',
      formModelPlaceholderSearchKey:'搜索菜单名称',
      formModelPlaceholderDescription:'请输入角色描述',

      InfoNotification: "信息通知",
      deleteContent: "您确定要删除角色{name}吗?",
      dialogTitle:'{title} 角色',

    }
  }
</i18n>

<script lang='jsx'>
import { Modal } from '@arco-design/web-vue'
import { computed, onMounted, watch } from 'vue'
import { menuIndex, roleDelete, roleIndex, roleInfo, roleSave } from '@/https/api/settingApi'
import useLoading from '@/hooks/loading'
import { usePermissionStore } from '@/stores/usePermissionStore'
import { sortTreeData } from '@/utils/index'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()

    const usePermissionStores = usePermissionStore()
    const { loading, setLoading } = useLoading()

    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        name: '',
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getRoleIndex() {
      tableLoading.value = true
      const { code, data } = await roleIndex()
      if (code === 200) {
        tableData.value = data.roles
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
        getRoleIndex()
    })

    const treeRef = ref(null)
    const searchKey = ref('')
    function extractIds(obj) {
      const ids = []

      function extract(obj) {
        for (const key in obj) {
          if (typeof obj[key] === 'object')
            extract(obj[key])
          else if (key === 'id')
            ids.push(obj[key])
        }
      }

      extract(obj)

      return ids
    }
    const originTreeData = ref([])
    const checkedLength = computed(() => {
      return extractIds(originTreeData.value).length
    })

    async function getMenuIndex() {
      const { code, data } = await menuIndex()
      if (code === 200)
        originTreeData.value = data.menus
    }

    const treeData = computed(() => {
      if (!searchKey.value)
        return originTreeData.value
      return recursiveSearch(searchKey.value, originTreeData.value)
    })

    const indeterminate = ref(false)
    const checkedAll = ref(false)

    const formRef = ref(null)
    const generateFormModel = () => {
      return {
        id: '',
        name: '',
        description: '',
        role_menu: [],
      }
    }
    const formModel = ref(generateFormModel())
    const visibleDialog = ref(false)
    const dialogTitle = ref(t('new'))
    // 新增弹窗

    function addDialog(_record, title = t('new')) {
      dialogTitle.value = title
      indeterminate.value = false
      checkedAll.value = false
      formModel.value = generateFormModel()
      if (_record && _record.id)
        formModel.value.parent_id = _record.id
      visibleDialog.value = true
    }

    // 修改弹窗
    async function editDialog(_record, title = t('edit')) {
      dialogTitle.value = title
      indeterminate.value = false
      checkedAll.value = false
      formModel.value = generateFormModel()
      formModel.value = _record
      visibleDialog.value = true
      setLoading(true)
      const { code, data } = await roleInfo({ id: formModel.value.id })
      if (code === 200)
        treeRef.value.checkNode(data.role_menu.map(Number), true, true)

      setLoading(false)
    }
    // 全选
    const handleChangeAll = (value) => {
      indeterminate.value = false
      if (value) {
        treeRef.value.checkAll(true)
        checkedAll.value = true
      }
      else {
        treeRef.value.checkAll(false)
        checkedAll.value = false
      }
    }

    const halfChecked = ref([])
    // 节点选择
    const handleChange = (values, data) => {
      if (values.length === checkedLength.value) {
        checkedAll.value = true
        indeterminate.value = false
      }
      else if (values.length === 0) {
        checkedAll.value = false
        indeterminate.value = false
      }
      else {
        checkedAll.value = false
        indeterminate.value = true
      }
      formModel.value.role_menu = [...values, ...data.halfCheckedKeys]
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
                {t('deleteContent', { name: _record.name })}
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
      getMenuIndex()
      getRoleIndex()
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
                      getRoleIndex()
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
                  <div className="w-full flex flex-col gap-5 md:flex-row md:justify-between">
                    <div>
                      <a-button
                        v-hasPermi="['/v1/role/save']"
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
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-5 md:flex-row">
                      <a-input
                        class="w-full md:max-w-320px md:w-full"
                        v-model={searchForm.value.name}
                        placeholder={t('searchName')}
                        allow-clear
                      />
                      <div>
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
                      </div>
                    </div>
                  </div>

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
                      columns: () => {
                        return (
                          <>
                            <a-table-column title={t('name')} data-index="name" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('description')} data-index="description" ellipsis tooltip></a-table-column>
                            <a-table-column title={t('operation')} align="center" fixed="right" width={130}>
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content={t('edit')}>
                                      <a-button
                                        v-hasPermi="['/v1/role/info']"
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
                                        v-hasPermi="['/v1/role/delete']"
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
          title={t('dialogTitle', { title: dialogTitle.value })}
          onBeforeOk={async (done) => {
            try {
              const isValid = await formRef.value.validate()
              if (isValid) {
                done(false)
                return
              }

              const { code } = await roleSave(formModel.value)
              if (code === 200) {
                await usePermissionStores.getUseInfo()
                done(true)
                getRoleIndex()
              }
              else {
                done(false)
              }
            }
            catch (error) {
              done(false)
            }
          }}
          unmountOnClose
        >
          <a-spin class="w-full" loading={loading.value}>
            <a-form
              ref={formRef}
              model={formModel.value}
              layout="vertical"
            >
              <a-form-item field="name" hide-label validate-trigger="blur" required>
                <a-input v-model={formModel.value.name} placeholder={t('formModelPlaceholderName')} />
              </a-form-item>
              <a-form-item>
                <div className="h-250px w-full flex flex-col">
                  <a-input-search
                    v-model={searchKey.value}
                    placeholder={t('formModelPlaceholderSearchKey')}
                  >
                    {{ prepend: () => {
                      return (
                        <>
                          <a-checkbox
                            model-value={checkedAll.value}
                            indeterminate={indeterminate.value}
                            onChange={(values) => {
                              handleChangeAll(values)
                            }}
                          >
                          </a-checkbox>
                        </>
                      )
                    },

                    }}
                  </a-input-search>
                  <div class="mt-1 flex-1 overflow-auto">
                    <a-tree
                      ref={treeRef}
                      data={sortTreeData(treeData.value)}
                      checkable={true}
                      block-node={true}
                      default-expand-all={false}
                      half-checked-keys={halfChecked.value}
                      fieldNames={{
                        key: 'id',
                        title: 'name',
                        children: 'children',
                        icon: 'icons',
                      }}
                      onCheck={(values, data) => {
                        handleChange(values, data)
                      }}
                    >
                    </a-tree>
                  </div>
                </div>

              </a-form-item>
              <a-form-item field="description" hide-label>
                <a-textarea v-model={formModel.value.description} placeholder={t('formModelPlaceholderDescription')} allow-clear />
              </a-form-item>

            </a-form>

          </a-spin>

        </a-modal>

      </>
    )
  },
})
</script>

<route lang="json5">
  {
    name: 'Roles',
    meta: {
      requiresAuth:true,
    }
  }
</route>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-3);
}
::-webkit-scrollbar-thumb {
  background-color: var(--color-text-4);
}

::-webkit-scrollbar {
  background-color: transparent;
}
</style>
