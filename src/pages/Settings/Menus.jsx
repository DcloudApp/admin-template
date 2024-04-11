// @unocss-include
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const generateFormModel = () => {
      return {
        name: '',
      }
    }
    const formModel = ref(generateFormModel())
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ]
    const data = ref([
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
      },
      {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
      },
      {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
      },
      {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
      },
      {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
      },
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
      },
      {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
      },
      {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
      },
      {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
      },
      {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
      },
    ])

    return () => (
      <>
        <a-card title="Menus" class="general-card" bordered={false}>

          <a-row class="gap-2">
            <a-col xs={24} md={24} lg={2}>
              <a-button class="w-full" type="primary">
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
                v-model={formModel.value.name}
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
          <a-table columns={columns} bordered={false} data={data.value} />
        </a-card>
      </>
    )
  },
})
