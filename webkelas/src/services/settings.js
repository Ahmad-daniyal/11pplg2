import { reactive } from 'vue'
import { CONFIG } from '../config'
import { storage } from '../utils/storage'

export const theme = reactive({ dark: false })

function applyTheme() {
  document.documentElement.classList.toggle('dark', theme.dark)
}

export function useSettings() {
  function init() {
    theme.dark = storage.get(CONFIG.THEME_KEY, 'light') === 'dark'
    applyTheme()
  }

  function toggleDark() {
    theme.dark = !theme.dark
    storage.set(CONFIG.THEME_KEY, theme.dark ? 'dark' : 'light')
    applyTheme()
  }

  return { init, toggleDark }
}