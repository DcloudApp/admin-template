import hasPermi from './hasPermi'

// 指令对象
const directives = {
  hasPermi,
}

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
