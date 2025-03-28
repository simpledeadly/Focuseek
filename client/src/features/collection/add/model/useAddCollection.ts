import { ShallowRef } from 'vue'
import { useAuth } from '@/app/auth/useAuth'
import { createCollection, addCollectionToList, type Collection } from '@/entities/collection'
import { addCollectionToServer } from '@/shared/api/api'

const { getUserId } = useAuth()

export const useAddCollection = (collections: ShallowRef<Collection[]>) => {
  const addCollection = async (title: string) => {
    const collection = createCollection(getUserId!, title)
    const serverCollection = await addCollectionToServer(collection)
    collections.value = addCollectionToList(collections.value, serverCollection)
  }

  return { addCollection }
}
