import { filterItemsByType, filterDoneItems, isItemType, Item, type ItemType } from '@/entities/item'
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
    set: (type) => {
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

  const filteredItems = computed(() => {
    return filterItemsByType(isHideDone.value ? filterDoneItems(items.value) : items.value, itemType.value)
  })

  return { itemType, filteredItems, isHideDone }
}
