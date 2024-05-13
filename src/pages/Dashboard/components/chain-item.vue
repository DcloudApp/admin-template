<script lang='jsx'>
import { computed, onMounted, ref } from 'vue'
import useLoading from '@/hooks/loading'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    quota: {
      type: String,
      default: '',
    },
    chartType: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(true)
    const count = ref(0)
    const growth = ref(100)
    const isUp = computed(() => growth.value > 50)
    const chartData = ref([])
    const chartOption = computed(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          show: false,
        },
        yAxis: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: '{c}',
        },
        series: [
          {
            data: chartData.value,
            ...(props.chartType === 'bar'
              ? {
                  type: 'bar',
                  barWidth: 7,
                  barGap: '0',
                }
              : {
                  type: 'line',
                  showSymbol: false,
                  smooth: true,
                  lineStyle: {
                    color: '#4080FF',
                  },
                }),
          },
        ],
      }
    })

    function queryDataChainGrowth(params) {
      return new Promise((resolve) => {
        const data = {
          retentionTrends: {
            count: 2428,
            growth: 33.99,
            chartData: {
              xAxis: [
                '1日',
                '2日',
                '3日',
                '4日',
                '5日',
                '6日',
                '7日',
                '8日',
                '9日',
                '10日',
                '11日',
                '12日',
              ],
              data: {
                name: 'contentConsumptionTrends',
                value: [
                  2546,
                  2581,
                  2530,
                  2003,
                  2528,
                  2593,
                  1522,
                  1801,
                  1006,
                  1574,
                  1727,
                  1101,
                ],
              },
            },
          },
          userRetention: {
            count: 2096,
            growth: 98.04,
            chartData: {
              xAxis: [
                '1日',
                '2日',
                '3日',
                '4日',
                '5日',
                '6日',
                '7日',
                '8日',
                '9日',
                '10日',
                '11日',
                '12日',
              ],
              data: {
                name: 'retentionTrends',
                value: [
                  1347,
                  2468,
                  2389,
                  1182,
                  1516,
                  2257,
                  1097,
                  2610,
                  1574,
                  1223,
                  1944,
                  1321,
                ],
              },
            },
          },
          contentConsumptionTrends: {
            count: 1298,
            growth: 60.23,
            chartData: {
              xAxis: [
                '1日',
                '2日',
                '3日',
                '4日',
                '5日',
                '6日',
                '7日',
                '8日',
                '9日',
                '10日',
                '11日',
                '12日',
              ],
              data: {
                name: 'contentConsumption',
                value: [
                  1448,
                  1454,
                  1542,
                  1188,
                  2392,
                  1241,
                  2973,
                  2706,
                  2682,
                  1181,
                  1870,
                  2027,
                ],
              },
            },
          },
          contentConsumption: {
            count: 2313,
            growth: 35.42,
            chartData: {
              xAxis: [
                '1日',
                '2日',
                '3日',
                '4日',
                '5日',
                '6日',
                '7日',
                '8日',
                '9日',
                '10日',
                '11日',
                '12日',
              ],
              data: {
                name: 'userRetention',
                value: [
                  1317,
                  1293,
                  2945,
                  2951,
                  2822,
                  2130,
                  1519,
                  1054,
                  2676,
                  2998,
                  2318,
                  1341,
                ],
              },
            },
          },
        }
        setTimeout(() => {
          resolve(data[params])
        }, 1000)
      })
    }
    async function fetchData(params) {
      try {
        const data = await queryDataChainGrowth(params)
        const { chartData: resChartData } = data
        count.value = data.count
        growth.value = data.growth
        resChartData.data.value.forEach((el, idx) => {
          if (props.chartType === 'bar') {
            chartData.value.push({
              value: el,
              itemStyle: {
                color: idx % 2 ? '#468DFF' : '#86DF6C',
              },
            })
          }
          else {
            chartData.value.push(el)
          }
        })
      }
      finally {
        setLoading(false)
      }
    }
    onMounted(() => {
      fetchData(props.quota)
    })
    return () => (
      <>
        <a-spin loading={loading.value} class="w-full">
          <a-card
            class="general-card"
            title={props.title}
            header-style={{ paddingBottom: '12px' }}
          >
            <div class="content">
              <a-statistic
                value={count.value}
                show-group-separator={true}
                value-from={0}
                animation
              />
              <a-typography-text
                class="percent-text"
                type={isUp.value ? 'danger' : 'success'}
              >
                { `${growth.value}%` }
                {isUp.value ? <icon-arrow-rise /> : <icon-arrow-fall />}
              </a-typography-text>
            </div>
            <div class="chart">
              <Chart option={chartOption.value} />
            </div>
          </a-card>
        </a-spin>
      </>
    )
  },
})
</script>

<style scoped lang="scss">
  .general-card {
    min-height: 204px;
  }
  .content {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
  }
  .percent-text {
    margin-left: 16px;
  }
  .chart {
    width: 100%;
    height: 80px;
    vertical-align: bottom;
  }

  .unit {
    padding-left: 8px;
    font-size: 12px;
  }

  .label {
    padding-right: 8px;
    font-size: 12px;
  }
</style>
