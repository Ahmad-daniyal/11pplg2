<script setup>
import { computed } from 'vue'
import { useStore } from '../../data/index.js'
import { CONFIG } from '../../core/config.js'
import Page from '../../components/ui/Page.vue'

const { state, days } = useStore()

const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' })
const todayLabel = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 11) return 'Selamat Pagi'
  if (h < 15) return 'Selamat Siang'
  if (h < 19) return 'Selamat Sore'
  return 'Selamat Malam'
})

const todaySchedule = computed(() => state.schedule.filter((s) => s.day === today))

const latestHighlights = computed(() =>
  [...state.highlights].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3),
)

const highlightTints = ['bg-yellow', 'bg-red', 'bg-ink', 'bg-white']

const stats = computed(() => [
  { label: 'Siswa', value: state.students.length },
  { label: 'Hari Belajar', value: days.length },
  { label: 'Kegiatan', value: state.activities.length },
  { label: 'Highlight', value: state.highlights.length },
])

const statStyles = ['bg-yellow', 'bg-red', 'bg-ink', 'bg-white']

function formatDate(d) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div>
    <Page title="Dashboard" :description="todayLabel" />

    <div class="hero-sticker bg-ink">
      <div class="hero-stamp bg-yellow rot-r">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      </div>
      <div class="hero-body">
        <div class="hero-title">{{ CONFIG.APP_NAME }}</div>
        <div class="hero-sub">{{ CONFIG.SCHOOL }}</div>
      </div>
      <div class="hero-date bg-red rot-l">{{ todayLabel }}</div>
    </div>

    <div class="grid grid-4 mb-2">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        class="stat"
        :class="[statStyles[i % statStyles.length], i % 2 ? 'rot-r' : 'rot-l']"
      >
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value">{{ s.value }}</div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="card-title"><span class="title-tag bg-yellow rot-l">Jadwal Hari Ini</span></div>
        <div v-if="todaySchedule.length" class="timeline">
          <div
            v-for="s in todaySchedule"
            :key="s.id"
            class="timeline-item"
            :class="{ 'timeline-break': s.type === 'break', 'timeline-free': s.type === 'free' }"
          >
            <span class="timeline-dot"></span>
            <div class="timeline-time">{{ s.time }}</div>
            <div class="timeline-body">
              <span v-if="s.type === 'break'" class="badge badge-yellow">Istirahat</span>
              <span v-else-if="s.type === 'free'" class="muted small">Tidak ada pelajaran</span>
              <template v-else>
                <strong>{{ s.subject }}</strong>
                <span v-if="s.teacher" class="muted small"> · {{ s.teacher }}</span>
              </template>
            </div>
          </div>
        </div>
        <div v-else class="empty">Tidak ada jadwal hari ini</div>
      </div>

      <div class="card">
        <div class="card-title"><span class="title-tag bg-red rot-r">Highlight</span></div>
        <div v-if="latestHighlights.length" class="hl-list">
          <div
            v-for="(h, i) in latestHighlights"
            :key="h.id"
            class="hl-card"
            :class="[highlightTints[i % highlightTints.length], i % 2 ? 'rot-r' : 'rot-l']"
          >
            <div class="hl-meta">
              <span class="hl-date">{{ formatDate(h.date) || 'Tanpa tanggal' }}</span>
              <span class="hl-cat">{{ h.category }}</span>
            </div>
            <strong class="hl-title">{{ h.title || 'Highlight' }}</strong>
          </div>
        </div>
        <div v-else class="empty">Belum ada highlight</div>
      </div>
    </div>
  </div>
</template>