<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@/app/router'
import { registerUser } from '@/shared/api/api'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'

const username = ref('')
const password = ref('')

const emit = defineEmits<{
  (e: 'loading', value: boolean): void
}>()

const register = async () => {
  try {
    if (username.value.length !== 0 && password.value.length !== 0) {
      const res = await registerUser(username.value, password.value)
      emit('loading', true)
      console.log('Пользователь зарегистрирован!', res)
      console.log('localStorage:', localStorage.getItem('auth'))
      password.value = ''
      router.push({ name: 'todo' }).then(() => window.location.reload())
    }
  } catch (e: any) {
    alert(e)
  }
}
</script>

<template>
  <div class="register-page">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Join Focuseek!</CardDescription>
      </CardHeader>
      <form @submit.prevent="register" class="form">
      <CardContent>
          <div class="grid w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Input v-model="username" type="text" id="username" placeholder="Enter username" required />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Input v-model="password" type="password" id="password" placeholder="Enter password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-center px-6 pb-6" style="flex-direction: column;">
          <Button type="submit" @click="register" style="width: 100%;">Sign up</Button>
          <br>
          <div class="flex">
            <p>Already use Focuseek?</p>
            <RouterLink to="/login" class="ml-2">
              <p><strong>Sign in</strong></p>
            </RouterLink>
          </div>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<style lang="scss">
.register-page {
  margin: auto 0;
  height: 85vh;
}
</style>
