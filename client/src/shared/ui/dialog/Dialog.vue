<script setup lang="ts">
import Dialog from 'primevue/dialog'

const model = defineModel<boolean>()
</script>

<template>
  <Dialog
    v-model:visible="model"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <slot />
  </Dialog>
</template>
