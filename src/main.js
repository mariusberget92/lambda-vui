import { createApp } from 'vue'
import TailwindPlugin from './plugins/TailwindPlugin.js'
import ToastPlugin from './plugins/ToastPlugin.js'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import App from './App.vue'
import './assets/tailwind.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

createApp(App)
  .use(PerfectScrollbar)
  .use(TailwindPlugin)
  .use(ToastPlugin)
  .mount('#app')
