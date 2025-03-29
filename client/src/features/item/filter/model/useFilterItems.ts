import { useCollection } from '@/features/collection/filter'
import {
  filterItemsByType,
  filterDoneItems,
  isItemType,
  Item,
  type ItemType,
} from '@/entities/item'
import { filterItemsByCollection, filterParentItems } from '@/entities/item/lib/item'
import { computed, ref, ShallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useItemType = () => {
  const route = useRoute()
  const router = useRouter()

  const itemType = computed<ItemType>({
    get: () => {
      const type = route.query.type
      return isItemType(type) ? type : 'todo'
    },
    set: (type: ItemType) => {
      router.push({ query: { type } })
    },
  })

  return { itemType }
}

export const useHideDone = () => {
  const isHideDone = ref(JSON.parse(localStorage.getItem('hide')!) || false)

  return { isHideDone }
}

export const useFilterItems = (items: ShallowRef<Item[]>) => {
  const { itemType } = useItemType()
  const { isHideDone } = useHideDone()
  const { collections, collection, collectionId } = useCollection()

  const filteredParentItems = computed(() => {
    const itemsToFilter = items.value

    if (!collectionId) {
      console.log('collectionId not found', collections.value, collection, collectionId)
      throw new Error('collectionId not found')
    }

    const filteredDoneItems = filterDoneItems(itemsToFilter)
    const filteredItemsByCollection = filterItemsByCollection(itemsToFilter, collectionId.value)

    return filterParentItems(filterItemsByType(
      isHideDone.value
        ? filterItemsByCollection(filteredDoneItems, collectionId.value)
        : filteredItemsByCollection,
      itemType.value
    ))
  })

  const filteredItems = computed(() => {
    const itemsToFilter = items.value

    if (!collectionId) {
      console.log('collectionId not found', collections.value, collection, collectionId)
      throw new Error('collectionId not found')
    }

    const filteredDoneItems = filterDoneItems(itemsToFilter)
    const filteredItemsByCollection = filterItemsByCollection(itemsToFilter, collectionId.value)

    return filterItemsByType(
      isHideDone.value
        ? filterItemsByCollection(filteredDoneItems, collectionId.value)
        : filteredItemsByCollection,
      itemType.value
    )
  })

  return { itemType, filteredItems, filteredParentItems, collectionId, isHideDone }
}
