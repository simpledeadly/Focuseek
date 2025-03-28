import { ShallowRef } from 'vue'
import { Collection, removeCollectionFromListById } from '@/entities/collection'
import { deleteCollectionFromServer } from '@/shared/api/api'

export const useRemoveCollection = (collections: ShallowRef<Collection[]>) => {
  const removeCollection = (collection: Collection) => {
    collections.value = removeCollectionFromListById(collections.value, collection.id)
    console.log(collection, collection.id)
    deleteCollectionFromServer(collection.id)
  }

  return { removeCollection }
}
