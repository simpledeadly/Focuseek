<script setup lang="ts">
import { Badge } from '@/shared/ui/badge'
import { onMounted, onUnmounted, ref, watch } from 'vue'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

const props = defineProps<{
  deadline?: string
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const dateInput = ref<string>(props.deadline || '')

const intervalId = ref<NodeJS.Timeout>()
const targetDate = ref<Date>(new Date())

const deadlineText = ref<string>('loading...')
const timeLeft = ref<string>('Deadline will be here')

// Обновляем targetDate при изменении dateInput
watch(dateInput, (newValue) => {
  try {
    const parsedDate = new Date(newValue)
    if (!isNaN(parsedDate.getTime())) {
      targetDate.value = parsedDate
    }
  } catch (e) {
    console.error('Error parsing date:', e)
  }
})

onMounted(() => {
  if (props.deadline) {
    try {
      targetDate.value = new Date(props.deadline)
    } catch (e) {
      console.error('Error parsing initial deadline:', e)
    }
  }

  intervalId.value = setInterval(() => {
    const now = new Date()
    const diff = targetDate.value.getTime() - now.getTime()

    if (!props.deadline) {
      deadlineText.value = 'Add DL'
      return
    }

    const minutesAll = Math.floor(diff / (1000 * 60))

    if (diff < 0) {
      deadlineText.value = 'Expired 😵: ' + minutesAll * -1 + 'm'
    } else {
      deadlineText.value = `${minutesAll}m`

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      timeLeft.value = `Remained ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    }
  }, 100)
})

onUnmounted(() => {
  clearInterval(intervalId.value)
})

const handleSave = () => {
  emit('change', dateInput.value)
}

const handleBadgeVariant = () => {
  if (!props.deadline) {
    return 'outline'
  } else if (parseInt(deadlineText.value.replace(/\D+/g, '')) <= 960 && !deadlineText.value.includes('Expired')) {
    return 'destructive'
  } else {
    return 'secondary'
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Badge
        :variant="handleBadgeVariant()"
        class="item-deadline"
        :title="timeLeft"
      >
        {{ deadlineText }}
      </Badge>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-2 space-y-2">
      <Input 
        v-model="dateInput"
        placeholder="YYYY-M-DD HH:mm"
      />
      <Button @click="handleSave">Save</Button>
    </PopoverContent>
  </Popover>
</template>

<style lang="scss">
.item-deadline {
  cursor: pointer;
}
</style>
