import { createApp } from 'vue'
import App from '../App.vue'
import router from './router.js'
import { useSettings } from '../services/settings.js'
import '../styles/base.css'
import '../styles/components/layout.css'
import '../styles/components/ui.css'
import '../styles/utils.css'
import '../styles/features/dashboard.css'
import '../styles/features/jadwal.css'
import '../styles/features/highlight.css'
import '../styles/features/siswa.css'
import '../styles/responsive.css'

useSettings().init()

createApp(App).use(router).mount('#app')