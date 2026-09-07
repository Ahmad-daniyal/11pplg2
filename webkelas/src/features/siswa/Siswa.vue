<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from '../core/store.js'
import Page from '../components/Page.vue'
import { resolveMedia } from '../utils/media.js'
import { openLightbox } from '../services/lightbox.js'

const { state } = useStore()

const cardTints = ['bg-yellow', 'bg-red', 'bg-white', 'bg-ink']
const colors = ['#e63946', '#f4b740', '#111111', '#333333', '#555555', '#8a3ffc', '#0f766e', '#b45309']

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
          <span v-if="profilePhoto" class="profile-photo" @click="openLightbox(profilePhoto, selected.name)">
            <img :src="profilePhoto" :alt="selected.name" />
          </span>
          <span v-else class="profile-photo" :style="{ background: colorFor(selected.id) }">
            {{ initials(selected.name) }}
          </span>
          <div class="profile-name">{{ selected.name }}</div>
          <div class="profile-gender">
            <span class="badge badge-ink">{{ genderLabel(selected.gender) }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
