<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from '../../data/index.js'
import Page from '../../components/ui/Page.vue'
import { resolveMedia } from '../../utils/media.js'
import { openLightbox } from '../../services/lightbox.js'
import { CONFIG } from '../../core/config.js'

const { state } = useStore()

const cardTints = ['bg-yellow', 'bg-red', 'bg-white', 'bg-ink']
const colors = ['#e63946', '#f4b740', '#111111', '#333333', '#555555', '#8a3ffc', '#0f766e', '#b45309']

const socials = {
  instagram: { base: 'https://instagram.com/', label: 'Instagram' },
  tiktok: { base: 'https://tiktok.com/@', label: 'TikTok' },
}

function socialUrl(handle, key) {
  const value = String(handle || '').trim().replace(/^@/, '')
  if (!value) return ''
  return /^https?:\/\//i.test(value) ? value : socials[key].base + value
}

const selected = ref(null)

function studentById(id) {
  return state.students.find((s) => s.id === id)
}

function studentName(id) {
  return studentById(id)?.name || '—'
}

function studentPhoto(id) {
  return studentById(id)?.photo ? resolveMedia(studentById(id).photo, 'siswa') : ''
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function colorFor(id) {
  return colors[id % colors.length]
}

function tintFor(id) {
  return cardTints[id % cardTints.length]
}

function genderLabel(g) {
  if (!g) return '—'
  const t = String(g).toLowerCase()
  if (t === 'p' || t === 'perempuan') return 'Perempuan'
  return 'Laki-laki'
}

function openStudent(s) {
  selected.value = s
}

function closeStudent() {
  selected.value = null
}

function onKey(e) {
  if (e.key === 'Escape') closeStudent()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

const profilePhoto = computed(() =>
  selected.value?.photo ? resolveMedia(selected.value.photo, 'siswa') : '',
)

const profileTint = computed(() => tintFor(selected.value?.id || 0))

const studentIndex = computed(() =>
  String(
    (state.students.findIndex((s) => s.id === selected.value?.id) + 1 || 0),
  ).padStart(2, '0'),
)

const orgRole = computed(() =>
  state.organizers.find((o) => o.studentId === selected.value?.id)?.role || '',
)
</script>

<template>
  <div>
    <Page
      title="Organisasi & Siswa"
      description="Pengurus kelas & daftar siswa · isi lewat src/data/organizers.json"
    />

    <div class="card">
      <div class="card-title">
        <span class="title-tag bg-yellow rot-l">Pengurus Kelas</span>
      </div>
      <div class="org-grid mt-2">
        <div
          v-for="(o, i) in state.organizers"
          :key="o.id"
          class="org-card"
          :class="[tintFor(i), i % 2 ? 'rot-r' : 'rot-l']"
        >
          <span class="org-role">{{ o.role }}</span>
          <span
            v-if="o.studentId && studentPhoto(o.studentId)"
            class="avatar has-photo"
            :class="{ 'slot-clickable': true }"
            @click="openLightbox(studentPhoto(o.studentId), studentName(o.studentId))"
          >
            <img :src="studentPhoto(o.studentId)" :alt="studentName(o.studentId)" />
          </span>
          <span
            v-else-if="o.studentId"
            class="avatar"
            :style="{ background: colorFor(o.studentId) }"
          >
            {{ initials(studentName(o.studentId)) }}
          </span>
          <div v-if="o.studentId" class="org-name">{{ studentName(o.studentId) }}</div>
          <div v-else class="muted small" style="padding: 0.4rem 0">Belum ditentukan</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="title-tag bg-ink rot-r">Daftar Siswa</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama</th>
              <th>L/P</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in state.students" :key="s.id" class="student-row" @click="openStudent(s)">
              <td>
                <span v-if="s.photo" class="photo-thumb student-thumb-click" @click.stop="openLightbox(resolveMedia(s.photo, 'siswa'), s.name)">
                  <img :src="resolveMedia(s.photo, 'siswa')" :alt="s.name" />
                </span>
                <span v-else class="photo-thumb photo-thumb-empty">{{ initials(s.name) }}</span>
              </td>
              <td>{{ s.name || '—' }}</td>
              <td>{{ s.gender }}</td>
            </tr>
            <tr v-if="!state.students.length">
              <td colspan="3" class="empty">Belum ada siswa.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="selected" class="profile-modal" @click.self="closeStudent">
        <div class="profile-card">
          <button class="lightbox-close" aria-label="Tutup" @click="closeStudent">×</button>

          <span class="profile-corner profile-corner-tl bg-yellow rot-l"></span>
          <span class="profile-corner profile-corner-br bg-red rot-r"></span>

          <div class="profile-media" :class="profileTint">
            <span v-if="profilePhoto" class="profile-photo" @click="openLightbox(profilePhoto, selected.name)">
              <img :src="profilePhoto" :alt="selected.name" />
            </span>
            <span v-else class="profile-photo" :style="{ background: colorFor(selected.id) }">
              {{ initials(selected.name) }}
            </span>
            <span class="profile-index bg-yellow rot-r">{{ studentIndex }}</span>
            <span class="profile-tag bg-ink rot-l">{{ orgRole || 'Siswa' }}</span>
          </div>

          <div class="profile-main">
            <div class="profile-chips">
              <span class="badge badge-ink">{{ genderLabel(selected.gender) }}</span>
              <span v-if="orgRole" class="badge badge-yellow rot-l">{{ orgRole }}</span>
              <span class="badge badge-outline">{{ CONFIG.APP_NAME }}</span>
            </div>

            <h2 class="profile-name">{{ selected.name }}</h2>

            <div v-if="selected.hobby || selected.quote" class="profile-info-grid">
              <div v-if="selected.hobby" class="profile-info-cell">
                <span class="profile-detail-label">Hobi</span>
                <span>{{ selected.hobby }}</span>
              </div>
              <div v-if="selected.quote" class="profile-info-cell">
                <span class="profile-detail-label">Motto</span>
                <span class="profile-quote">“{{ selected.quote }}”</span>
              </div>
            </div>

            <div class="profile-social">
              <a
                v-if="socialUrl(selected.instagram, 'instagram')"
                :href="socialUrl(selected.instagram, 'instagram')"
                target="_blank"
                rel="noopener"
                class="profile-social-btn"
                @click.stop
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>{{ selected.instagram.replace(/^@/, '') }}</span>
              </a>
              <a
                v-if="socialUrl(selected.tiktok, 'tiktok')"
                :href="socialUrl(selected.tiktok, 'tiktok')"
                target="_blank"
                rel="noopener"
                class="profile-social-btn"
                @click.stop
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>{{ selected.tiktok.replace(/^@/, '') }}</span>
              </a>
            </div>

            <div class="profile-footer">
              <span>{{ CONFIG.SCHOOL }}</span>
              <span class="profile-footer-mark bg-yellow">{{ studentIndex }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
