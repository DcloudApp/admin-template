import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Message, Modal } from '@arco-design/web-vue'
import directives from '@/directive/index'
import { i18n } from '@/locales/index'
import App from '@/App.vue'
import router from '@/router'

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'virtual:uno.css'

const app = createApp(App)

Modal._context = app._context
Message._context = app._context

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(directives)

app.mount('#app')
