<script setup>
import { RouterLink } from 'vue-router'
import { CONFIG } from '../../core/config'
import { useStore } from '../../data'

const { state, days } = useStore()

const icons = {
  dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  calendar: '<rect x="3" y="4" width="18" height="18"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
}

const nav = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/jadwal', label: 'Jadwal', icon: 'calendar' },
  { to: '/kegiatan', label: 'Kegiatan', icon: 'book' },
  { to: '/highlight', label: 'Highlight', icon: 'star' },
  { to: '/siswa', label: 'Organisasi & Siswa', icon: 'users' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">
        <img class="brand-logo" src="/photo/logo/logo.jpeg" alt="Logo Kelas" />
      </div>
      <div>
        <div class="brand-text">{{ CONFIG.APP_NAME }}</div>
        <div class="brand-sub">{{ CONFIG.SCHOOL }}</div>
      </div>
    </div>
    <nav class="nav">
      <div class="nav-label">Menu</div>
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="active"
      >
        <span class="nav-icon" v-html="icons[item.icon]"></span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div class="sidebar-footer">
      {{ state.students.length }} siswa · {{ days.length }} hari belajar
    </div>
  </aside>
</template>