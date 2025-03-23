<script setup lang="ts">
import type { ItemType } from '@/entities/item'
import { Select } from '@/shared/ui/select'

const model = defineModel<ItemType>()

// const types = [{ name: 'todo' }, { name: 'note' }, { name: 'project' }]
const types: ItemType[] = ['todo', 'note', 'project']
</script>

<template>
  <Select
    v-model="model"
    :options="types"
    class="item-type-select"
  />
</template>

<style lang="scss">
.item-type-select {
  &__content {
    border-right: none;
    border-left: none;
    border-radius: 0;
  }

  &__item {
    // width: 100%;
  }
}
</style>
