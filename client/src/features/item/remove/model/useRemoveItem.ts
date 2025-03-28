import { ShallowRef } from 'vue'
import { removeItemFromListById, type Item } from '@/entities/item'
import { deleteItemFromServer } from '@/shared/api/api'

export const useRemoveItem = (items: ShallowRef<Item[]>) => {
  const removeItem = (item: Item) => {
    items.value = removeItemFromListById(items.value, item.id)
    deleteItemFromServer(item.id)
  }

  return { removeItem }
}
