<script setup lang="ts">
import { Switch } from '@/shared/ui/switch'

const model = defineModel<boolean>()
</script>

<template>
  <div class="hide-toggle flex items-center space-x-2">
    <Switch
      id="hide-done"
      v-model="model"
    />
    <Label for="hide-done">Hide done</Label>
  </div>
</template>

<style lang="scss">
.hide-toggle {
  /** keep */
}
</style>
