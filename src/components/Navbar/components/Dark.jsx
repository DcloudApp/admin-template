export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    return () => (
      <>
        <a-button
          size="medium"
          shape="circle"
          status="normal"
          onClick={() => {
            toggleDark()
          }}
        >
          {{
            icon: () => {
              return (
                <>
                  {isDark.value ? <><icon-sun-fill /></> : <><icon-moon-fill /></>}
                </>
              )
            },
          }}
        </a-button>
      </>
    )
  },
})
