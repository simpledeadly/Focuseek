<script setup lang="ts">
import { useRouter } from 'vue-router'
import { CollectionEntity, useCollections } from '@/entities/collection'
import { AddCollectionForm, useAddCollection } from '@/features/collection/add'
import { Separator } from '@/shared/ui/separator'
import { CollectionTitle, useChangeCollectionTitle } from '@/features/collection/change-title'
import { Button } from '@/shared/ui/button'
import { CollectionRemoveButton, useRemoveCollection } from '@/features/collection/remove'

const router = useRouter()

const { collections } = useCollections()
const { addCollection } = useAddCollection(collections)
const { changeCollectionTitle } = useChangeCollectionTitle(collections)
const { removeCollection } = useRemoveCollection(collections)
</script>

<template>
  <div class="collections-page">
    <AddCollectionForm @submit="addCollection($event)" />

    <Separator
      :label="collections.length === 0 ? 'No collections' : collections.length + ' collections'"
      style="margin-bottom: 2rem"
    />

    <TransitionGroup name="fade">
      <CollectionEntity
        v-for="col in collections"
        :key="col.id"
      >
        <template #title>
          <CollectionTitle
            :title="col.title"
            @save="changeCollectionTitle(col, $event)"
          />
        </template>
        <template #removeButton>
          <CollectionRemoveButton
            :collection="col"
            @remove="removeCollection(col)"
          />
        </template>
        <template #typeSelect>
          <Button @click="router.push(`/${col.title.toLocaleString().toLocaleLowerCase()}`)"
            >Go to</Button
          >
        </template>
      </CollectionEntity>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.collections-page {
  /** keep */
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
