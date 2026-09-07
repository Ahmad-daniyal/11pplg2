import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { useSettings } from './services/settings.js'
import './styles/global.css'

useSettings().init()

createApp(App).use(router).mount('#app')