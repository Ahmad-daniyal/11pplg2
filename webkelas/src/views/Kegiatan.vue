<script setup>
import { computed } from 'vue'
import { useStore } from '../core/store.js'
import Page from '../components/Page.vue'
import { resolveMedia, resolveVideo } from '../utils/media.js'

const { state } = useStore()

const sorted = computed(() =>
  [...state.activities].sort((a, b) => (b.date || '').localeCompare(a.date || '')),
)

const cardStyles = ['bg-yellow', 'bg-red', 'bg-white', 'bg-ink']

function formatDate(d) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div>
    <Page
      title="Kegiatan"
      description="Laporan kegiatan kelas · isi lewat src/data/activities.json"
    />

    <div v-if="sorted.length" class="grid grid-2">
      <article
        v-for="(a, i) in sorted"
        :key="a.id"
        class="card activity-card"
        :class="[cardStyles[i % cardStyles.length], i % 2 ? 'rot-r' : 'rot-l']"
      >
        <div class="photo-slot">
          <video v-if="a.video" :src="resolveVideo(a.video)" controls></video>
          <img v-else-if="a.photo" :src="resolveMedia(a.photo, 'kegiatan')" :alt="a.title" />
          <span v-else class="photo-hint">Foto</span>
        </div>
        <div class="activity-top">
          <span class="badge badge-ink">{{ a.category }}</span>
          <span class="small" style="opacity: 0.8">{{ formatDate(a.date) }}</span>
        </div>
        <h3 v-if="a.title" class="activity-title">{{ a.title }}</h3>
        <p v-else class="muted small">Belum diisi</p>
        <p v-if="a.description" class="small">{{ a.description }}</p>
        <p v-else class="muted small">Deskripsi belum diisi.</p>
      </article>
    </div>
    <div v-else class="card">
      <div class="empty">Belum ada kegiatan.</div>
    </div>
  </div>
</template>