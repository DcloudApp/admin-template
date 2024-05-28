<i18n lang="json5">
  {
    en: {
      DataOverview:'Data Overview',
      ContentProduction: "Content Production",
      ContentClick:'Content Click',
      ContentExposure:'Content Exposure',
      ActiveUsers:'Active Users',
    },
    zh: {
      DataOverview:'数据总览',
      ContentProduction: "内容生产量",
      ContentClick:'内容点击量',
      ContentExposure:'内容曝光量',
      ActiveUsers:'活跃用户数',
    }
  }
</i18n>

<script lang='jsx'>
import { computed } from 'vue'
import DataChainGrowth from './components/data-chain-growth.vue'
import useLoading from '@/hooks/loading'

export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const { t } = useI18n()
    const isDark = useDark()
    const { loading } = useLoading(false)
    const renderData = computed(() => [
      {
        title: t('ContentProduction'),
        value: 1902,
        prefix: () => {
          return (
            <span
              class="statistic-prefix bg-#FFE4BA dark:bg-#593E2F"
            >
              <icon-edit class="text-#F77234 dark:text-#F29A43"></icon-edit>
            </span>
          )
        },
      },
      {
        title: t('ContentClick'),
        value: 2445,
        prefix: () => {
          return (
            <span
              class="statistic-prefix bg-#E8FFFB dark:bg-#3D5A62"
            >
              <icon-thumb-up class="text-#33D1C9 dark:text-#6ED1CE"></icon-thumb-up>
            </span>
          )
        },
      },
      {
        title: t('ContentExposure'),
        value: 3034,
        prefix: () => {
          return (
            <span
              class="statistic-prefix bg-#E8F3FF dark:bg-#354276"
            >
              <icon-heart class="text-#165DFF dark:text-#4A7FF7"></icon-heart>
            </span>
          )
        },
      },
      {
        title: t('ActiveUsers'),
        value: 1275,
        prefix: () => {
          return (
            <span
              class="statistic-prefix bg-#F5E8FF dark:bg-#3F385E"
            >
              <icon-user class="text-#722ED1 dark:text-#8558D3"></icon-user>
            </span>
          )
        },
      },
    ])
    const xAxis = ref([
      '12.10',
      '12.11',
      '12.12',
      '12.13',
      '12.14',
      '12.15',
      '12.16',
      '12.17',
    ])
    const contentProductionData = ref([
      2887,
      2751,
      3497,
      1602,
      2606,
      3286,
      2775,
      2290,
    ])
    const contentClickData = ref([
      3057,
      3681,
      899,
      1072,
      1344,
      3180,
      2945,
      3661,
    ])
    const contentExposureData = ref([
      2082,
      868,
      1502,
      1815,
      1766,
      3813,
      1441,
      2926,
    ])
    const activeUsersData = ref([
      1770,
      2196,
      2821,
      1456,
      1976,
      1473,
      2440,
      3738,
    ])
    const generateSeries = (
      name,
      lineColor,
      itemBorderColor,
      data,
    ) => {
      return {
        name,
        data,
        stack: 'Total',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: lineColor,
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: lineColor,
            borderWidth: 2,
            borderColor: itemBorderColor,
          },
        },
        lineStyle: {
          width: 2,
          color: lineColor,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.1,
          color: lineColor,
        },
      }
    }
    const tooltipItemsHtmlString = (items) => {
      return items
        .map(
          el => `
          <div class="content-panel gap-5">
            <p>
              <span style="background-color: ${
                el.color
              }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
            </p>
            <span class="tooltip-value">${el.value.toLocaleString()}</span>
          </div>
        `,
        )
        .reverse()
        .join('')
    }
    const chartOption = computed(() => {
      return {
        grid: {
          left: '2.6%',
          right: '4',
          top: '40',
          bottom: '40',
        },
        xAxis: {
          type: 'category',
          offset: 2,
          data: xAxis.value,
          boundaryGap: false,
          axisLabel: {
            color: '#4E5969',
            formatter(value, idx) {
              if (idx === 0)
                return ''
              if (idx === xAxis.value.length - 1)
                return ''
              return `${value}`
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: '#23ADFF',
              width: 2,
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value, idx) {
              if (idx === 0)
                return String(value)
              return `${value / 1000}k`
            },
          },
          splitLine: {
            lineStyle: {
              color: isDark.value ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const [firstElement] = params
            return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params)}
          </div>`
          },
          className: 'echarts-tooltip-diy',
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '2.6%',
              bottom: '18',
              style: {
                text: '12.10',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12,
              },
            },
            {
              type: 'text',
              right: '0',
              bottom: '18',
              style: {
                text: '12.17',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12,
              },
            },
          ],
        },
        series: [
          generateSeries(
            t('ActiveUsers'),
            '#722ED1',
            '#F5E8FF',
            activeUsersData.value,
          ),
          generateSeries(
            t('ContentExposure'),
            '#3469FF',
            '#E8F3FF',
            contentExposureData.value,
          ),
          generateSeries(
            t('ContentClick'),
            '#33D1C9',
            '#E8FFFB',
            contentClickData.value,
          ),
          generateSeries(
            t('ContentProduction'),
            '#F77234',
            '#FFE4BA',
            contentProductionData.value,
          ),

        ],
      }
    })

    return () => (
      <>
        <div className="w-full flex flex-col gap-5 overflow-x-hidden">
          <a-spin class="w-full" loading={loading.value}>
            <a-card
              class="general-card"
              title={t('DataOverview')}
            >
              <div className="grid grid-cols-2 w-full gap-5 md:grid-cols-4">
                {renderData.value.map((item) => {
                  return (
                    <>
                      <a-statistic
                        title={item.title}
                        value={item.value}
                        show-group-separator
                        value-from={0}
                        animation
                      >
                        {{ prefix: () => {
                          return (
                            <>
                              {item.prefix()}
                            </>
                          )
                        },
                        }}
                      </a-statistic>
                    </>
                  )
                })}
              </div>
              <Chart class="h-328px w-full" option={chartOption.value} />
            </a-card>
          </a-spin>
          <DataChainGrowth />
        </div>
      </>
    )
  },
})
</script>

<style lang="scss" scoped>
 :deep(.arco-statistic) {
  .arco-statistic-title {
    color: rgb(var(--gray-10));
    font-weight: bold;
  }
  .arco-statistic-value {
    display: flex;
    align-items: center;
  }
}
.statistic-prefix {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: var(--color-white);
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  border-radius: 6px;
}
</style>

<route lang="json5">
  {
    name: 'dashboard',
    meta: {
      requiresAuth:true,
    }
  }
</route>
