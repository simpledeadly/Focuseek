<script setup lang="ts">
import { ItemType } from '@/entities/item'
import { capitalize } from '@/shared/lib/utils'
import Select from 'primevue/select'

const model = defineModel()

const props = defineProps<{
  isTypeSelect?: boolean
  options: ItemType[]
}>()
</script>

<template>
  <Select
    v-model="model"
    :options="props.options"
    :option-label="(option: string) => capitalize(isTypeSelect ? option.slice(0, 1) : option)"
  />
</template>
