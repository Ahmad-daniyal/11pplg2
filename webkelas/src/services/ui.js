import { reactive } from 'vue'

export const ui = reactive({
  searchOpen: false,
})

export function openSearch() {
  ui.searchOpen = true
}

export function closeSearch() {
  ui.searchOpen = false
}