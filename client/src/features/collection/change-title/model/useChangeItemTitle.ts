import { ShallowRef } from 'vue'
import { updateCollection, replaceCollectionInList, type Collection } from '@/entities/collection'
import { updateCollectionOnServer } from '@/shared/api/api'

export const useChangeCollectionTitle = (collections: ShallowRef<Collection[]>) => {
  const changeCollectionTitle = async (collection: Collection, title: string) => {
    const newCollection = updateCollection(collection, { title })
    try {
      await updateCollectionOnServer(collection.id, newCollection)
      collections.value = replaceCollectionInList(collections.value, newCollection)
    } catch (error) {
      console.error('Ошибка при изменении названия коллекции:', error)
    }
  }

  return { changeCollectionTitle }
}
