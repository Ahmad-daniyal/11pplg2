<script setup>
import { useStore } from '../core/store.js'
import Page from '../components/Page.vue'
import { resolveMedia } from '../utils/media.js'

const { state } = useStore()

const cardTints = ['bg-yellow', 'bg-red', 'bg-white', 'bg-ink']
const colors = ['#e63946', '#f4b740', '#111111', '#333333', '#555555', '#8a3ffc', '#0f766e', '#b45309']

function studentName(id) {
  return state.students.find((s) => s.id === id)?.name || '—'
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
          <span v-if="o.studentId" class="avatar" :style="{ background: colorFor(o.studentId) }">
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
            <tr v-for="s in state.students" :key="s.id">
              <td>
                <span v-if="s.photo" class="photo-thumb">
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
  </div>
</template>