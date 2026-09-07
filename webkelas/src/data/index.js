import { reactive, watch } from 'vue'
import { CONFIG } from '../core/config'
import { storage } from '../utils/storage'
import students from './students.json'
import schedule from './schedule.json'
import activities from './activities.json'
import highlights from './highlights.json'
import organizers from './organizers.json'

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

function seed() {
  return {
    students: students.map((s) => ({ ...s })),
    organizers: organizers.map((o) => ({ ...o })),
    schedule: schedule.map((s) => ({ ...s })),
    activities: activities.map((a) => ({ ...a })),
    highlights: highlights.map((h) => ({ ...h })),
  }
}

function mergeStored() {
  const stored = storage.get(CONFIG.STORAGE_KEY, null)
  if (!stored || typeof stored !== 'object') return seed()
  return {
    ...seed(),
    ...stored,
    students: Array.isArray(stored.students)
      ? stored.students.map((st) => ({
          ...(seed().students.find((x) => x.id === st.id) || {}),
          ...st,
        }))
      : seed().students,
    organizers: Array.isArray(stored.organizers) ? stored.organizers : seed().organizers,
    schedule: Array.isArray(stored.schedule) ? stored.schedule : seed().schedule,
    activities: Array.isArray(stored.activities) ? stored.activities : seed().activities,
    highlights: Array.isArray(stored.highlights) ? stored.highlights : seed().highlights,
  }
}

const state = reactive(mergeStored())

watch(
  state,
  (val) => storage.set(CONFIG.STORAGE_KEY, val),
  { deep: true },
)

export function useStore() {
  function resetData() {
    const fresh = seed()
    Object.keys(fresh).forEach((k) => {
      state[k] = fresh[k]
    })
  }

  return { state, days: DAYS, resetData }
}