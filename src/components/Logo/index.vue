<script lang='jsx'>
import { app } from '@/themeConfig'

export default defineComponent({
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <>
        <div className="w-full flex items-center justify-center gap-2">
          <div
            className={`h-33px w-33px ${app.logo}`}
            onClick={() => {
              emit('click')
            }}
          />
          <div className={`text-18px font-500 text-[var(--color-text-1)] ${props.showTitle ? `flex` : `hidden`}`}>
            {app.title}
          </div>
        </div>
      </>
    )
  },
})
</script>
