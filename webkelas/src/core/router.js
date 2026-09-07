import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../features/dashboard/Dashboard.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
  { path: '/jadwal', name: 'Jadwal', component: () => import('../features/jadwal/Jadwal.vue'), meta: { title: 'Jadwal Pelajaran' } },
  { path: '/kegiatan', name: 'Kegiatan', component: () => import('../features/kegiatan/Kegiatan.vue'), meta: { title: 'Kegiatan' } },
  { path: '/highlight', name: 'Highlight', component: () => import('../features/highlight/Highlight.vue'), meta: { title: 'Highlight' } },
  { path: '/siswa', name: 'Siswa', component: () => import('../features/siswa/Siswa.vue'), meta: { title: 'Organisasi & Siswa' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router