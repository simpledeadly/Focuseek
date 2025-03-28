<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
// import { useItemType } from '@/features/item/filter'
// const { itemType } = useItemType()
// console.log(itemType.value)
</script>

<template>
  <nav class="app-navbar">
    <Tabs
      default-value="todo"
      class="w-[400px] app-navbar__container"
    >
      <TabsList class="app-navbar__tabs">
        <RouterLink to="/collections">
          <TabsTrigger value="todo">Todos</TabsTrigger>
        </RouterLink>
        <RouterLink to="/collections">
          <TabsTrigger value="note">Notes</TabsTrigger>
        </RouterLink>
      </TabsList>
    </Tabs>
  </nav>
</template>

<style lang="scss">
.app-navbar {
  &__container {
    margin: 0 auto;
    margin-top: 0.25rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__tabs {
    background: hsl(var(--primary-foreground)) !important;
    border: 1px solid hsl(var(--border));
  }
}
</style>
