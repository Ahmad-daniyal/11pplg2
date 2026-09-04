import { reactive } from 'vue'

export const lightbox = reactive({
  open: false,
  src: '',
  alt: '',
})

export function openLightbox(src, alt = '') {
  lightbox.src = src
  lightbox.alt = alt
  lightbox.open = true
}

export function closeLightbox() {
  lightbox.open = false
}
