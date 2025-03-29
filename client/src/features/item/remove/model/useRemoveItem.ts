import { ShallowRef } from 'vue'
import {
  removeItemFromListById,
  removeItemWithSubItemsFromListById,
  type Item,
} from '@/entities/item'
import { deleteItemFromServer } from '@/shared/api/api'
import { useShowSubItems } from '../../show-sub-items'

export const useRemoveItem = (items: ShallowRef<Item[]>) => {
  const { hasSubItems } = useShowSubItems(items)

  const removeItem = (item: Item) => {
    if (hasSubItems(item.id)) {
      items.value = removeItemWithSubItemsFromListById(items.value, item.id)
    } else {
      items.value = removeItemFromListById(items.value, item.id)
    }
    deleteItemFromServer(item.id)
  }

  return { removeItem }
}
