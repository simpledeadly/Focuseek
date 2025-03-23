<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { UserCircle } from 'lucide-vue-next'
import DialogClose from '@/shared/ui/dialog/DialogClose.vue'
import { useAuth } from '@/app/useAuth'

const model = defineModel<boolean>()

const { getUserId } = useAuth()
</script>

<template>
  <div class="profile-page">
    <Dialog v-model="model">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.asdfasdf</span
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

.profile-page {
  &__footer {
    display: flex;
    align-items: end;
  }
}
</style>
