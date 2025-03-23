<script setup lang="ts">
import type { ItemType } from '@/entities/item'
import { Select } from '@/shared/ui/select'

const model = defineModel<ItemType>()

const colorsForTypes = () => {
  if (model.value === 'todo') {
    return 'background: #ff0000; color: #f0f0f0;'
  }
  if (model.value === 'note') {
    return 'background: #ffd700; color: #0f0f0f'
  }
  if (model.value === 'project') {
    return 'background: #1600ff; color: #f0f0f0'
  }
}

// const types = [{ name: 'T' }, { name: 'N' }, { name: 'P' }]
// const types = ['T', 'N', 'P']
const types: ItemType[] = ['todo', 'note', 'project']
</script>

<template>
  <Select
    v-model="model"
    :options="types"
    :style="colorsForTypes()"
    class="type-select"
    isTypeSelect
  />
</template>

<style lang="scss">
@mixin other-font {
  font-family: 'Fira Code', monospace;
  font-weight: 500;
}

.type-select {
  &__trigger {
    width: 100%;
    height: 100%;
    padding: calc(var(--radius) - 6px) calc(var(--radius) - 2px);
    border: none;
    @include other-font();
  }

  &__content {
    @include other-font();
  }
}
</style>
