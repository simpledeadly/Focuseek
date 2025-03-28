import axios from 'axios'
import { useAuth } from '@/app/auth/useAuth'
import type { User } from '@/entities/user/types/user'
import type { Collection } from '@/entities/collection'
import type { Item } from '../../entities/item/types/item'

const API_URL = 'http://localhost:3000/api'

// === COLLECTIONS ===

export const fetchCollectionsFromServer = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/collections`, {
      headers: {
        authorization: token,
      },
    })
    console.log('Коллекции успешно получены:', response.data)
    return response.data
  } catch (e) {
    console.error('Ошибка при получении данных:', e)
    throw new Error('Ошибка при получении данных')
  }
}

export const addCollectionToServer = async (collection: Collection): Promise<Collection> => {
  try {
    const token = localStorage.getItem('token')
    console.log('collection:', collection)

    console.log('POST collection before', collection.userId, getUserId)

    const response = await axios.post(`${API_URL}/collections`, collection, {
      headers: {
        authorization: token,
      },
    })
    console.log('Коллекция успешно добавлена на сервер:', response.data)
    console.log(
      'POST collection after 2',
      collection.userId,
      getUserId,
      response.data.collection.userId
    )

    return response.data.collection
  } catch (e) {
    console.error('Ошибка при добавлении коллекции на сервер:', e)
    throw new Error('Ошибка при добавлении коллекции на сервере')
  }
}

export const updateCollectionOnServer = async (id: number, updatedCollection: Collection) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.put(`${API_URL}/collections/${id}`, updatedCollection, {
      headers: {
        authorization: token,
      },
    })
    console.log('Коллекция успешно обновлёна на сервере:', response.data)
  } catch (e) {
    console.error('Ошибка при обновлении коллекции на сервере:', e)
    throw new Error('Ошибка при обновлении коллекции на сервере')
  }
}

export const deleteCollectionFromServer = async (id: number) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.delete(`${API_URL}/collections/${id}`, {
      headers: {
        authorization: token,
      },
    })
    console.log('Коллекция успешно удалёна с сервера:', response.data)
  } catch (e) {
    console.error('Ошибка при удалении коллекции с сервера:', e)
    throw new Error('Ошибка при удалении коллекции с сервера')
  }
}

// === USERS ===

const { setUserId, getUserId } = useAuth()

export const registerUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password })
    const userId = response.data.userId
    const token = response.data.token
    console.log('register userId:', userId)
    console.log('register token:', token)

    localStorage.setItem('token', token)
    setUserId(userId)

    await axios.post('/collections', {
      collections: [{ title: 'inbox' }, { title: 'today' }],
    })

    return response.data
  } catch (e) {
    console.error('Ошибка при регистрации:', e)
    throw new Error('Ошибка при регистрации')
  }
}

export const loginUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    const userId = response.data.userId
    const token = response.data.token
    console.log('login userId:', userId)
    console.log('login token:', token)

    localStorage.setItem('token', token)
    setUserId(userId)

    return response.data
  } catch (e) {
    console.error('Ошибка при входе:', e)
    throw new Error('Ошибка входа')
  }
}

// === ITEMS ===

export const fetchItemsFromServer = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/items`, {
      headers: {
        authorization: token,
      },
    })
    console.log('Элементы успешно получены:', response.data)
    return response.data
  } catch (e) {
    console.error('Ошибка при получении данных:', e)
    throw new Error('Ошибка при получении данных')
  }
}

export const addItemToServer = async (item: Item): Promise<Item> => {
  try {
    const token = localStorage.getItem('token')
    console.log('item:', item)

    console.log('POST Item before', item.userId, getUserId)

    const response = await axios.post(`${API_URL}/items`, item, {
      headers: {
        authorization: token,
      },
    })
    console.log('Элемент успешно добавлен на сервер:', response.data)
    console.log('POST Item after 2', item.userId, getUserId, response.data.item.userId)

    return response.data.item
  } catch (e) {
    console.error('Ошибка при добавлении элемента на сервер:', e)
    throw new Error('Ошибка при добавлении элемента на сервере')
  }
}

export const updateItemOnServer = async (id: number, updatedItem: Item) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.put(`${API_URL}/items/${id}`, updatedItem, {
      headers: {
        authorization: token,
      },
    })
    console.log('Элемент успешно обновлён на сервере:', response.data)
  } catch (e) {
    console.error('Ошибка при обновлении элемента на сервере:', e)
    throw new Error('Ошибка при обновлении элемента на сервере')
  }
}

export const deleteItemFromServer = async (id: number) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.delete(`${API_URL}/items/${id}`, {
      headers: {
        authorization: token,
      },
    })
    console.log('Элемент успешно удалён с сервера:', response.data)
  } catch (e) {
    console.error('Ошибка при удалении элемента с сервера:', e)
    throw new Error('Ошибка при удалении элемента с сервера')
  }
}
