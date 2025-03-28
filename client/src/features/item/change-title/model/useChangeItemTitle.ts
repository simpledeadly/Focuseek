import { ShallowRef } from 'vue'
import { updateItem, replaceItemInList, type Item } from '@/entities/item'
import { updateItemOnServer } from '@/shared/api/api'

export const useChangeItemTitle = (items: ShallowRef<Item[]>) => {
  const changeItemTitle = async (item: Item, title: string) => {
    const newItem = updateItem(item, { title })
    try {
      await updateItemOnServer(item.id, newItem)
      items.value = replaceItemInList(items.value, newItem)
    } catch (error) {
      console.error('Ошибка при изменении названия элемента:', error)
    }
  }

  return { changeItemTitle }
}
