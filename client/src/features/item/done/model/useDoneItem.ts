import { ShallowRef } from 'vue'
import { updateItem, replaceItemInList, type Item } from '@/entities/item'
import { updateItemOnServer } from '@/shared/api/api'

export const useDoneItem = (items: ShallowRef<Item[]>) => {
  const toggleDoneItem = async (item: Item) => {
    const newItem = updateItem(item, { isDone: !item.isDone })
    await updateItemOnServer(item.id, newItem)
    items.value = replaceItemInList(items.value, newItem)
  }

  return { toggleDoneItem }
}
