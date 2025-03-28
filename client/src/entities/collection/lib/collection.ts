import type { Collection } from '../types/collection'

export const createCollection = (userId: number, title: string): Collection => {
  return {
    id: Date.now(),
    userId,
    title,
    createdAt: Date.now(),
    editedAt: Date.now(),
  }
}

export const updateCollection = (
  collection: Collection,
  changes: Partial<Collection>
): Collection => {
  return { ...collection, ...changes }
}

export const addCollectionToList = (
  collectionList: Collection[],
  collection: Collection
): Collection[] => {
  return [...collectionList, collection]
}

export const removeCollectionFromListById = (
  collectionList: Collection[],
  id: number
): Collection[] => {
  const idx = collectionList.findIndex((collection) => collection.id === id)
  if (idx > -1) {
    return [...collectionList.slice(0, idx), ...collectionList.slice(idx + 1)]
  }
  return collectionList
}

export const replaceCollectionInList = (
  collectionList: Collection[],
  newCollection: Collection
): Collection[] => {
  const idx = collectionList.findIndex((collection) => collection.id === newCollection.id)
  if (idx > -1) {
    return [...collectionList.slice(0, idx), newCollection, ...collectionList.slice(idx + 1)]
  }
  return collectionList
}
