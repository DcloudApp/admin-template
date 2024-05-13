<script lang='jsx'>
import VCharts from 'vue-echarts'

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
