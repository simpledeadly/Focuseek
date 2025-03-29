<script setup lang="ts">
import { ref } from 'vue'
import { ItemEntity, useItems, filterNestedItems } from '@/entities/item'
import { AddItemForm, useAddItem } from '@/features/item/add'
import { useChangeItemDeadline } from '@/features/item/change-deadline'
import { ItemTitle, useChangeItemTitle } from '@/features/item/change-title'
import { Deadline } from '@/features/item/change-deadline'
import { ItemCheckbox, useDoneItem } from '@/features/item/done'
import { ItemTypeSelect, useFilterItems } from '@/features/item/filter'
import { ItemRemoveButton, useRemoveItem } from '@/features/item/remove'

import { Checkbox } from '@/shared/ui/checkbox'
import { StickyNote } from 'lucide-vue-next'

const { items } = useItems()
const { itemType, filteredItems, filteredParentItems, collectionId } = useFilterItems(items)
const { addItem } = useAddItem(items)
const { removeItem } = useRemoveItem(items)
const { toggleDoneItem } = useDoneItem(items)
const { changeItemTitle } = useChangeItemTitle(items)
const { changeItemDeadline } = useChangeItemDeadline(items)

const showSubItems = ref<boolean>(true)
</script>

<template>
  <AddItemForm
    v-model:type="itemType"
    @submit="addItem(collectionId, $event.itemTitle, itemType, $event.parentId)"
  >
    <template #select>
      <ItemTypeSelect v-model="itemType" />
    </template>
  </AddItemForm>

  <div
    v-if="filteredParentItems.length > 0"
    class="item-list"
  >
    <TransitionGroup name="fade">
      <ItemEntity
        v-for="item in filteredParentItems"
        :key="item.id"
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
        <template #showSubItemsToggle>
          <Checkbox v-model="showSubItems" />
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
        <template
          #subItems
          v-if="showSubItems"
        >
          <ItemEntity
            v-for="subItem in filterNestedItems(filteredItems, item.id)"
            :key="subItem.id"
          >
            <template
              v-if="itemType !== 'note'"
              #checkbox
            >
              <ItemCheckbox
                :model-value="subItem.isDone"
                @update:model-value="toggleDoneItem(subItem)"
              />
            </template>
            <template #title>
              <ItemTitle
                :is-done="subItem.isDone"
                :title="subItem.title"
                @save="changeItemTitle(subItem, $event)"
              />
            </template>
            <template
              v-if="itemType !== 'note' && !subItem.isDone"
              #timeLeft
            >
              <Deadline
                :deadline="subItem.deadline"
                @change="changeItemDeadline(subItem, $event)"
              />
            </template>
            <template #removeButton>
              <ItemRemoveButton
                :item="subItem"
                @remove="removeItem(subItem)"
              />
            </template>
            <template
              #subItems
              v-if="showSubItems"
            >
              <ItemEntity
                v-for="subSubItem in filterNestedItems(filteredItems, subItem.id)"
                :key="subSubItem.id"
              >
                <template
                  v-if="itemType !== 'note'"
                  #checkbox
                >
                  <ItemCheckbox
                    :model-value="subSubItem.isDone"
                    @update:model-value="toggleDoneItem(subSubItem)"
                  />
                </template>
                <template #title>
                  <ItemTitle
                    :is-done="subSubItem.isDone"
                    :title="subSubItem.title"
                    @save="changeItemTitle(subSubItem, $event)"
                  />
                </template>
                <template
                  v-if="itemType !== 'note' && !subSubItem.isDone"
                  #timeLeft
                >
                  <Deadline
                    :deadline="subSubItem.deadline"
                    @change="changeItemDeadline(subSubItem, $event)"
                  />
                </template>
                <template #removeButton>
                  <ItemRemoveButton
                    :item="subSubItem"
                    @remove="removeItem(subSubItem)"
                  />
                </template>
              </ItemEntity>
            </template>
          </ItemEntity>
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
</template>

<style lang="scss">
.item-list {
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
