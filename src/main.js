import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue, { Message, Modal } from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import directives from '@/directive/index'
import { i18n } from '@/locales/index'
import App from '@/App.vue'
import router from '@/router'

import '@unocss/reset/tailwind.css'
import '@arco-design/web-vue/dist/arco.css'
import './styles/main.scss'
import 'virtual:uno.css'

const app = createApp(App)

Modal._context = app._context
Message._context = app._context

app.use(directives)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')
