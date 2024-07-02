<script lang='jsx'>
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const isDark = useDark({
      selector: 'html',
      attribute: 'theme',
      valueDark: 'dark',
      valueLight: 'light',
    })

    const toggleDark = useToggle(isDark)

    watch(() => isDark.value, (newVal) => {
      if (newVal)
        document.body.setAttribute('arco-theme', 'dark')
      else
        document.body.removeAttribute('arco-theme')
    }, { immediate: true })

    const toggleTheme = (event) => {
      // 兼容性处理
      if (!document.startViewTransition) {
        toggleDark()
        return
      }
      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      const transition = document.startViewTransition(async () => {
        toggleDark()
      })

      transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        document.documentElement.animate(
          {
            clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 500,
            easing: 'ease-in',
            pseudoElement: isDark.value
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
    }

    return () => (
      <>
        <a-button
          size="medium"
          shape="circle"
          status="normal"
          onClick={(e) => {
            toggleTheme(e)
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
</script>

<style  lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2147483646;
}

[theme='dark']::view-transition-old(root) {
  z-index: 2147483646;
}

[theme='dark']::view-transition-new(root) {
  z-index: 1;
}
</style>
