<script setup lang="ts">
import { Dialog } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { useColorMode } from '@vueuse/core'
import DialogClose from '@/shared/ui/dialog/DialogClose.vue'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Card, CardContent } from '@/shared/ui/card'
import { Switch } from '@/shared/ui/switch'
import { Label } from '@/shared/ui/label'
import { ref, watch } from 'vue'

const model = defineModel<boolean>()

const isHideDone = ref(JSON.parse(localStorage.getItem('hide')!) || false)

watch(isHideDone, () => localStorage.setItem('hide', isHideDone.value.toString()))

const handleReload = () => window.location.reload()

const mode = useColorMode()
const themes = ['dark', 'light']
const switchMode = (theme: any) => (mode.value = theme)
</script>

<template>
  <div class="settings-page">
    <Dialog v-model="model">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.2343242</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label
          for="username"
          class="font-semibold w-24"
          >Username</label
        >
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label
          for="email"
          class="font-semibold w-24"
          >Email</label
        >
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss">
* {
  outline: none;
}

.settings-page {
  &__footer {
    display: flex;
    align-items: end;
  }
}
</style>
