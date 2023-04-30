import { createApp } from 'vue'
import tailwindDRY from './plugins/TailwindDRY.js'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import App from './App.vue'
import './assets/tailwind.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

createApp(App).use(PerfectScrollbar).use(tailwindDRY).mount('#app')
