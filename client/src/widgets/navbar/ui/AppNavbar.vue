<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
// import { useItemType } from '@/features/item/filter'
// const { itemType } = useItemType()
// console.log(itemType.value)

// const options: any = ['Todos', 'Notes', 'Projects']

const items: any = ref([
  {
    label: 'Todos',
    path: '/'
  },
  {
    label: 'Notes',
    path: '/?type=note'
  },
  {
    label: 'Projects',
    path: '/?type=project'
  },
])
</script>

<template>
  <nav class="app-navbar">
    <Menubar
      :model="items"
      class="app-navbar__container"
    >
      <template #item="{ item, props }">
        <RouterLink :to="item.path">
          <a
            v-ripple
            class="flex items-center"
            v-bind="props.action"
          >
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
    </Menubar>
  </nav>
</template>

<style lang="scss">
.app-navbar {
  &__container {
    width: 30rem;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 0.25rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}
</style>
