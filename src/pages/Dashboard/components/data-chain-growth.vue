<i18n lang="json5">
  {
    en: {
      RetentionTrends: "Retention Trends",
      UserRetention:'User Retention',
      ContentConsumptionTrends:'Content Consumption Trends',
      ContentConsumption:'Content Consumption',
    },
    zh: {
      RetentionTrends: "用户留存趋势",
      UserRetention:'用户留存量',
      ContentConsumptionTrends:'内容消费趋势',
      ContentConsumption:'内容消费量',
    }
  }
</i18n>

<script lang='jsx'>
import ChainItem from './chain-item.vue'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    return () => (
      <>
        <div className="grid grid-cols-1 w-full gap-5 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
          <ChainItem
            title={t('RetentionTrends')}
            quota="retentionTrends"
            chart-type="line"
          />
          <ChainItem
            title={t('UserRetention')}
            quota="userRetention"
            chart-type="bar"
          />
          <ChainItem
            title={t('ContentConsumptionTrends')}
            quota="contentConsumptionTrends"
            chart-type="line"
          />
          <ChainItem
            title={t('ContentConsumption')}
            quota="contentConsumption"
            chart-type="bar"
          />
        </div>
      </>
    )
  },
})
</script>
