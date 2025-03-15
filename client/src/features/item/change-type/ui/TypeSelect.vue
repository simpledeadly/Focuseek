<script setup lang="ts">
import type { ItemType } from '@/entities/item'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

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
</script>

<template>
  <Select
    v-model="model"
    class="type-select"
  >
    <SelectTrigger
      class="w-[180px] type-select__trigger"
      :style="colorsForTypes()"
    >
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent class="type-select__content">
      <SelectGroup>
        <SelectItem value="todo">T</SelectItem>
        <SelectItem value="note">N</SelectItem>
        <SelectItem value="project">P</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
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
