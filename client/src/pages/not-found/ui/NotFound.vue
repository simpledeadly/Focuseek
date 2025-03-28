<script setup lang="ts">
import { router } from '@/app/router/router'
import { Button } from '@/shared/ui/button'
</script>

<template>
  <div class="not-found">
    <h1 style="font-size: 120px"><strong>404</strong></h1>
    <h2 style="font-size: 30px; color: #aaa">Кажется вы... заблудились...</h2>
    <br />
    <br />
    <Button @click="router.push({ name: 'collections' })"><strong>Но выход ЕСТЬ!</strong></Button>
  </div>
</template>

<style lang="scss">
.not-found {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
