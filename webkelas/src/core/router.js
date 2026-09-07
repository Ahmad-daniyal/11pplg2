import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
  { path: '/jadwal', name: 'Jadwal', component: () => import('../views/Jadwal.vue'), meta: { title: 'Jadwal Pelajaran' } },
  { path: '/kegiatan', name: 'Kegiatan', component: () => import('../views/Kegiatan.vue'), meta: { title: 'Kegiatan' } },
  { path: '/highlight', name: 'Highlight', component: () => import('../views/Highlight.vue'), meta: { title: 'Highlight' } },
  { path: '/siswa', name: 'Siswa', component: () => import('../views/Siswa.vue'), meta: { title: 'Organisasi & Siswa' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router