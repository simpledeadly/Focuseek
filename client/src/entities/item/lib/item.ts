import type { Item, ItemType } from '../types/item'

export const isItemType = (value: unknown): value is ItemType => {
  const types: unknown[] = ['todo', 'note']
  return types.includes(value)
}

export const createItem = (
  userId: number,
  collectionId: number,
  title: string,
  type: ItemType,
  parentItemId?: number
): Item => {
  return {
    id: Date.now(),
    userId,
    collectionId,
    title,
    type,
    createdAt: Date.now(),
    editedAt: Date.now(),
    parentItemId,
  }
}

export const updateItem = (item: Item, changes: Partial<Item>): Item => {
  return { ...item, ...changes }
}

export const addItemToList = (itemList: Item[], item: Item): Item[] => {
  return [...itemList, item]
}

export const replaceItemInList = (itemList: Item[], newItem: Item): Item[] => {
  const idx = itemList.findIndex((item) => item.id === newItem.id)
  if (idx > -1) {
    return [...itemList.slice(0, idx), newItem, ...itemList.slice(idx + 1)]
  }
  return itemList
}

export const removeItemFromListById = (itemList: Item[], id: number): Item[] => {
  const idx = itemList.findIndex((item) => item.id === id)
  if (idx > -1) {
    return [...itemList.slice(0, idx), ...itemList.slice(idx + 1)]
  }
  return itemList
}

export const removeItemWithSubItemsFromListById = (itemList: Item[], id: number): Item[] => {
  const idx = itemList.findIndex((item) => item.id === id)
  if (idx > -1) {
    let updatedList = [...itemList.slice(0, idx), ...itemList.slice(idx + 1)]

    let parentIds = [id]
    while (parentIds.length > 0) {
      const currentParentId = parentIds.pop()!
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].parentItemId === currentParentId) {
          parentIds.push(updatedList[i].id)
          updatedList = [...updatedList.slice(0, i), ...updatedList.slice(i + 1)]
          i--
        }
      }
    }

    return updatedList
  }
  return itemList
}

export const filterItemsByCollection = (itemList: Item[], collectionId: number): Item[] => {
  return itemList.filter((item) => item.collectionId === collectionId)
}

export const filterDoneItems = (itemList: Item[]): Item[] => {
  return itemList.filter((item) => !item.isDone)
}

export const filterParentItems = (itemList: Item[]): Item[] => {
  return itemList.filter((item) => !item.parentItemId)
}

export const filterNestedItems = (itemList: Item[], parentId: number): Item[] => {
  return itemList.filter((item) => item.parentItemId === parentId)
}

export const filterItemsByType = (itemList: Item[], type: ItemType): Item[] => {
  return itemList
    .filter((item) => item.type === type)
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => {
      const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Infinity
      const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Infinity

      return aDeadline - bDeadline
    })
}
