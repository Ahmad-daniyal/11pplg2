<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import BottomNav from './components/layout/BottomNav.vue'
import SearchOverlay from './components/ui/SearchOverlay.vue'
import Toast from './components/ui/Toast.vue'
import { ui, openSearch } from './services/ui.js'
import { theme, useSettings } from './services/settings.js'

const route = useRoute()
const { toggleDark } = useSettings()

const pageTitle = computed(() => route.meta.title || 'Dashboard')
</script>

<template>
  <div class="layout">
    <Sidebar />

    <main class="main">
      <div class="toolbar">
        <div class="toolbar-title">{{ pageTitle }}</div>
        <div class="toolbar-actions">
          <button class="icon-btn" title="Cari (Esc untuk tutup)" @click="openSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button class="icon-btn" :title="theme.dark ? 'Mode terang' : 'Mode gelap'" @click="toggleDark">
            <svg v-if="!theme.dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>
        </div>
      </div>

      <RouterView />
    </main>

    <SearchOverlay v-if="ui.searchOpen" />
    <BottomNav />
    <Toast />
  </div>
</template>