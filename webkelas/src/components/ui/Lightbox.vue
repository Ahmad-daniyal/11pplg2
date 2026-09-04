<script setup>
import { onMounted, onUnmounted } from 'vue'
import { lightbox, closeLightbox } from '../../services/lightbox'

function onKey(e) {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="lightbox.open" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-panel" role="dialog" aria-modal="true">
        <img :src="lightbox.src" :alt="lightbox.alt" />
        <button class="lightbox-close" aria-label="Tutup" @click="closeLightbox">×</button>
      </div>
    </div>
  </Teleport>
</template>
