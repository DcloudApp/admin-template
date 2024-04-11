import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { i18n } from '@/locales/index'
import App from '@/App.jsx'
import router from '@/router'

import '@arco-design/web-vue/dist/arco.css'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'virtual:uno.css'
import './permission.js'

const app = createApp(App)

app.use(i18n)

app.use(createPinia())

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
