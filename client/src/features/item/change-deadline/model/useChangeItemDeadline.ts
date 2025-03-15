import { updateItem, type Item } from '@/entities/item'
import { replaceItemInList } from '@/entities/item/lib/item'
import { updateItemOnServer } from '@/shared/api/api'
import { ShallowRef } from 'vue'

export const useChangeItemDeadline = (items: ShallowRef<Item[]>) => {
  const changeItemDeadline = async (item: Item, deadline: string) => {
    const newItem = updateItem(item, { deadline })
    try {
      await updateItemOnServer(item.id, newItem)
      items.value = replaceItemInList(items.value, newItem)
    } catch (error) {
      console.error('Ошибка при изменении типа элемента:', error)
    }
  }

  return { changeItemDeadline }
}
