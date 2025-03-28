<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { capitalize } from '@/shared/lib/utils'
import type { Item } from '@/entities/item/types/item'
import { useItemType } from '@/features/item/filter'
import { Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const props = defineProps<{
  item: Item
}>()

const { itemType } = useItemType()

const toaster = () => {
  toast(capitalize(itemType.value) + ' deleted', {
    description: 'It was: ' + props.item.title,
  })
}

const handleDelete = () => {
  emit('remove')
  toaster()
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <Tooltip>
      <TooltipTrigger as-child>
        <button
          type="button"
          class="item-remove-button"
          @click="handleDelete"
        >
          <Trash2 :size="16" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete {{ itemType }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style lang="scss">
.item-remove-button {
  display: flex;
  color: hsl(var(--muted-foreground));
  transition: all 0.05s;

  &:hover {
    color: hsl(var(--foreground));
  }
}
</style>
