import { ShallowRef } from 'vue'
import { useAuth } from '@/app/auth/useAuth'
import { createItem, addItemToList, Item, type ItemType } from '@/entities/item'
import { addItemToServer } from '@/shared/api/api'

const { getUserId } = useAuth()

export const useAddItem = (items: ShallowRef<Item[]>) => {
  const addItem = async (
    collectionId: number,
    title: string,
    type: ItemType,
    parentItemId?: number
  ) => {
    const item = createItem(getUserId!, collectionId, title, type, parentItemId)
    const serverItem = await addItemToServer(item)
    items.value = addItemToList(items.value, serverItem)
  }

  return { addItem }
}
