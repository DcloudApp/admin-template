<script lang='jsx'>
import VCharts from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
])
export default defineComponent({
  props: {
    option: {
      type: Object,
      default() {
        return {}
      },
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    class: {
      type: String,
      default: '100%',
    },

  },
  setup(props) {
    const renderChart = ref(false)
    onMounted(() => {
      renderChart.value = true
    })
    return () => (
      <>
        {renderChart.value
          ? (
            <VCharts
              option={props.option}
              autoresize={props.autoResize}
              class={props.class}
            />
            )
          : null}

      </>
    )
  },
})
</script>
