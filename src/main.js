import { createApp } from 'vue'
import tailwindDRY from './plugins/TailwindDRY.js'
import App from './App.vue'
import './assets/tailwind.css'

createApp(App).use(tailwindDRY).mount('#app')
