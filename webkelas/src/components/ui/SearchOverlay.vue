<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../data'
import { closeSearch } from '../../services/ui'
import { CONFIG } from '../../core/config'

const { state } = useStore()
const router = useRouter()

const query = ref('')

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  const out = []

  for (const a of state.activities) {
    if ((a.title + a.description + a.category).toLowerCase().includes(q)) {
      out.push({ type: 'Kegiatan', title: a.title, sub: `${a.category} · ${a.date || ''}`, to: '/kegiatan' })
    }
  }
  for (const h of state.highlights) {
    if ((h.title + h.content + h.category).toLowerCase().includes(q)) {
      out.push({ type: 'Highlight', title: h.title, sub: `${h.category} · ${h.date || ''}`, to: '/highlight' })
    }
  }
  for (const s of state.students) {
    if ((s.name).toLowerCase().includes(q)) {
      out.push({ type: 'Siswa', title: s.name, sub: s.gender === 'P' ? 'Perempuan' : 'Laki-laki', to: '/siswa' })
    }
  }
  for (const j of state.schedule) {
    if ((j.subject + j.teacher).toLowerCase().includes(q)) {
      out.push({ type: 'Jadwal', title: j.subject, sub: `${j.day} · ${j.time}`, to: '/jadwal' })
    }
  }
  return out.slice(0, CONFIG.SEARCH_LIMIT)
})

function go(item) {
  closeSearch()
  query.value = ''
  router.push(item.to)
}

function onKey(e) {
  if (e.key === 'Escape') closeSearch()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div class="search-overlay" @click.self="closeSearch">
      <div class="search-panel">
        <div class="search-input-wrap">
          <span class="muted">🔍</span>
          <input
            v-model="query"
            placeholder="Cari kegiatan, highlight, siswa, atau jadwal…"
            autofocus
          />
          <span class="search-kbd">Esc</span>
        </div>
        <div class="search-results">
          <button
            v-for="(r, i) in results"
            :key="i"
            class="search-item"
            @click="go(r)"
          >
            <span class="badge badge-ink" style="margin-right: 0.5rem">{{ r.type }}</span>
            <span class="search-item-title">{{ r.title }}</span>
            <span class="search-item-sub">{{ r.sub }}</span>
          </button>
          <div v-if="query && !results.length" class="empty">Tidak ditemukan hasil.</div>
          <div v-if="!query" class="empty">Ketik untuk mulai mencari.</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>