<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { type Collection } from '@/entities/collection'

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const props = defineProps<{
  collection: Collection
}>()

const toaster = () => {
  toast('Collection deleted', {
    description: 'It was: ' + props.collection.title,
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
          class="collection-remove-button"
          @click="handleDelete"
        >
          <Trash2 :size="16" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete collection</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style lang="scss">
.collection-remove-button {
  display: flex;
  color: hsl(var(--muted-foreground));
  transition: all 0.05s;

  &:hover {
    color: hsl(var(--foreground));
  }
}
</style>
