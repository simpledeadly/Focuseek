<script setup lang="ts">
import { Checkbox } from '@/shared/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { capitalize } from 'vue'
import { toast } from 'vue-sonner'
import { useItemType } from '../../filter'

const model = defineModel<boolean>()

const { itemType } = useItemType()

const toaster = () => {
  toast.success(capitalize(itemType.value) + ' completed', {
    description: "You're the terminator!",
    class: 'toast',
  })
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Checkbox
        v-model="model"
        class="item-checkbox"
        @click="model === false && toaster()"
      />
    </TooltipTrigger>
    <TooltipContent>
      <p>Mark as done</p>
    </TooltipContent>
  </Tooltip>
</template>

<style lang="scss">
.item-checkbox {
  border-radius: 100%;
}
</style>
