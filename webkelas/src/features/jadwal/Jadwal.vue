<script setup>
import { computed } from 'vue'
import { useStore } from '../../data/index.js'
import Page from '../../components/ui/Page.vue'

const { state, days } = useStore()

const byDay = computed(() =>
  days
    .map((day) => ({ day, items: state.schedule.filter((s) => s.day === day) }))
    .filter((d) => d.items.length),
)
</script>

<template>
  <div>
    <Page
      title="Jadwal Pelajaran"
      description="Jadwal kelas XI RPL 2 · perubahan lewat src/data/schedule.json"
    />

    <div v-if="byDay.length" class="grid grid-sched">
      <section v-for="(d, i) in byDay" :key="d.day" class="card">
        <div class="card-title">
          <span class="title-tag bg-yellow" :class="i % 2 ? 'rot-r' : 'rot-l'">{{ d.day }}</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Mapel</th>
                <th>Guru</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="s in d.items"
                :key="s.id"
                :class="{ 'row-break': s.type === 'break', 'row-free': s.type === 'free' }"
              >
                <td class="nowrap">{{ s.time }}</td>
                <td>
                  <span v-if="s.type === 'break'" class="badge badge-yellow">Istirahat</span>
                  <span v-else-if="s.type === 'free'" class="muted">Tidak ada pelajaran</span>
                  <span v-else>{{ s.subject }}</span>
                </td>
                <td>{{ s.teacher || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div v-else class="card">
      <div class="empty">Belum ada jadwal.</div>
    </div>
  </div>
</template>