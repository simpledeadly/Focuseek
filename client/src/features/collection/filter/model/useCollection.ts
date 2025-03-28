import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCollections } from '@/entities/collection'

export const useCollection = () => {
  const { collections } = useCollections()
  const route = useRoute()
  const collection = computed(() => {
    // console.log(route.params.collection)
    return route.params.collection
  })
  // console.log(collections.value, collection.value)

  const collectionId = computed<number>(() => {
    if (!collections.value.length) {
      return 1
    } else {
      return collections.value.find(
        (col) => col.title.toLocaleString().toLocaleLowerCase() === collection.value
      )!.id
    }
  })

  return { collections, collection, collectionId }
}
