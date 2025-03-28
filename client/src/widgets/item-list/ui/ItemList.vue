<script setup lang="ts">
import { ItemEntity, useItems } from '@/entities/item'
import { AddItemForm, useAddItem } from '@/features/item/add'
import { useChangeItemDeadline } from '@/features/item/change-deadline'
import { ItemTitle, useChangeItemTitle } from '@/features/item/change-title'
import { TypeSelect, useChangeItemType } from '@/features/item/change-type'
import { Deadline } from '@/features/item/change-deadline'
import { ItemCheckbox, useDoneItem } from '@/features/item/done'
import { ItemTypeSelect, useFilterItems } from '@/features/item/filter'
import { ItemRemoveButton, useRemoveItem } from '@/features/item/remove'
import { StickyNote } from 'lucide-vue-next'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/shared/ui/pagination'
import { Button } from '@/shared/ui/button'
import { computed, ref } from 'vue'

const { items } = useItems()
const { itemType, filteredItems, collectionId } = useFilterItems(items)
const { addItem } = useAddItem(items)
const { removeItem } = useRemoveItem(items)
const { toggleDoneItem } = useDoneItem(items)
const { changeItemTitle } = useChangeItemTitle(items)
const { changeItemDeadline } = useChangeItemDeadline(items)
const { changeItemType } = useChangeItemType(items)

const itemsPerPage = 10
const currentPage = ref(1)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredItems.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <AddItemForm
    v-model:type="itemType"
    @submit="addItem(collectionId, $event, itemType)"
  >
    <template #select>
      <ItemTypeSelect v-model="itemType" />
    </template>
  </AddItemForm>

  <div
    v-if="paginatedItems.length > 0"
    class="item-list"
  >
    <TransitionGroup name="fade">
      <ItemEntity
        v-for="item in paginatedItems"
        :key="item.id"
        :type="item.type"
      >
        <template
          v-if="itemType !== 'note'"
          #checkbox
        >
          <ItemCheckbox
            :model-value="item.isDone"
            @update:model-value="toggleDoneItem(item)"
          />
        </template>
        <template #title>
          <ItemTitle
            :is-done="item.isDone"
            :title="item.title"
            @save="changeItemTitle(item, $event)"
          />
        </template>
        <template
          v-if="itemType !== 'note' && !item.isDone"
          #timeLeft
        >
          <Deadline
            :deadline="item.deadline"
            @change="changeItemDeadline(item, $event)"
          />
        </template>
        <template #removeButton>
          <ItemRemoveButton
            :item="item"
            @remove="removeItem(item)"
          />
        </template>
        <template #typeSelect>
          <TypeSelect
            :model-value="item.type"
            @update:model-value="changeItemType(item, $event!)"
          />
        </template>
      </ItemEntity>
    </TransitionGroup>
  </div>
  <div
    v-else
    class="empty"
  >
    <StickyNote :size="40" />
    <strong class="empty__message">No {{ itemType }}s</strong>
  </div>

  <Pagination
    class="pagination"
    :items-per-page="itemsPerPage"
    :total="filteredItems.length"
    :sibling-count="1"
    show-edges
    :default-page="currentPage"
    @update:page="goToPage"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1"
    >
      <PaginationFirst @click="goToPage(1)" />
      <PaginationPrev @click="goToPage(currentPage - 1)" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === currentPage ? 'default' : 'outline'"
            @click="goToPage(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="item.type"
          :index="index"
        />
      </template>

      <PaginationNext @click="goToPage(currentPage + 1)" />
      <PaginationLast @click="goToPage(totalPages)" />
    </PaginationList>
  </Pagination>
</template>

<style lang="scss">
.item-list {
  // min-width: 350px;
  // max-width: 60% or 1024px;
  // width: calc(100vw - 20rem);
  width: 70vw;
  margin-bottom: 5rem;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #acacac;

  &__message {
    margin-top: 0.5rem;
    font-size: 20px;
  }
}

.pagination {
  opacity: 0;
  transition: all 0.1s;

  &:hover {
    opacity: 1;
  }
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
