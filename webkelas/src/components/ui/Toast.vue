<script setup>
import { toasts } from '../../services/toast'
</script>

<template>
  <Teleport to="body">
    <div class="toast-wrap">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="toast"
        :class="`toast-${t.type}`"
      >
        <span class="toast-dot"></span>
        <span>{{ t.message }}</span>
      </div>
    </div>
  </Teleport>
</template>