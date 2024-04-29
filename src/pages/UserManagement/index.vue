<script lang='jsx'>
import { usersIndex } from '@/https/api/userManagementApi'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const is_healer = {
      0: { title: 'no', color: '' },
      1: { title: 'Yes', color: '' },
      2: { title: 'Applying', color: '' },
      3: { title: 'Refuse', color: '' },
    }
    const GenderGroup = {
      0: { title: 'Male', color: '' },
      1: { title: 'Female', color: '' },
      2: { title: 'Unknown', color: '' },
      3: { title: 'Transsexuals', color: '' },
    }
    const tableLoading = ref(false)
    const tableData = ref([])
    const generateSearchForm = () => {
      return {
        name: '',
      }
    }
    const searchForm = ref(generateSearchForm())

    async function getUsersIndex() {
      tableLoading.value = true
      const { code, data } = await usersIndex(searchForm.value)
      if (code === 200) {
        tableData.value = data.users
        tableLoading.value = false
      }
    }

    getUsersIndex()

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
                      getUsersIndex()
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
                          return <div>New</div>
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
                      <a-button
                        type="primary"
                        onClick={() => {
                          getUsersIndex()
                        }}
                      >
                        {{ icon: () => {
                          return (
                            <>
                              <icon-search />
                            </>
                          )
                        }, default: () => {
                          return <div>Search</div>
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
                  >
                    {{

                      columns: () => {
                        return (
                          <>
                            <a-table-column title="avatar" ellipsis tooltip>
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
                            <a-table-column title="name" data-index="username" ellipsis tooltip></a-table-column>
                            <a-table-column title="guid" data-index="guid" ellipsis tooltip></a-table-column>
                            <a-table-column title="gender" data-index="gender" ellipsis tooltip>
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
                            <a-table-column title="is Healer" data-index="username" ellipsis tooltip>
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
                            <a-table-column title="cellphone" data-index="cellphone" ellipsis tooltip></a-table-column>
                            <a-table-column align="center" fixed="right" width={130} title="operation">
                              {{ cell: ({ record }) => {
                                return (
                                  <>
                                    <a-tooltip content="View">
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
