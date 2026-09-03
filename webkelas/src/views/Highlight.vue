<script setup>
import { computed } from 'vue'
import { useStore } from '../core/store.js'
import Page from '../components/Page.vue'
import { resolveMedia } from '../utils/media.js'

const { state } = useStore()

const sorted = computed(() =>
  [...state.highlights].sort((a, b) => (b.date || '').localeCompare(a.date || '')),
)

const cardStyles = ['bg-ink', 'bg-yellow', 'bg-red', 'bg-white']

function formatDate(d) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div>
    <Page
      title="Highlight"
      description="Sorotan prestasi & berita kelas · isi lewat src/data/highlights.json"
    />

    <div v-if="sorted.length" class="grid grid-2">
      <article
        v-for="(h, i) in sorted"
        :key="h.id"
        class="card highlight-card"
        :class="[cardStyles[i % cardStyles.length], i % 2 ? 'rot-l' : 'rot-r']"
      >
        <div class="photo-slot">
          <img v-if="h.photo" :src="resolveMedia(h.photo, 'kegiatan')" :alt="h.title" />
          <span v-else class="photo-hint">Foto</span>
        </div>
        <div class="highlight-top">
          <span class="highlight-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="badge" :class="i % 2 ? 'badge-yellow' : 'badge-ink'">{{ h.category }}</span>
        </div>
        <h3 v-if="h.title" class="highlight-title">{{ h.title }}</h3>
        <p v-else class="muted small">Belum diisi</p>
        <p v-if="h.content" class="highlight-quote">“{{ h.content }}”</p>
        <p v-else class="muted small">Keterangan belum diisi.</p>
        <div class="activity-top">
          <span class="small" style="opacity: 0.8">{{ formatDate(h.date) }}</span>
        </div>
      </article>
    </div>
    <div v-else class="card">
      <div class="empty">Belum ada highlight.</div>
    </div>
  </div>
</template>