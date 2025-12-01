import { useState, useCallback } from 'react'
import { ApiClient } from '@/api/base/apiClient'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/helpers'

interface UseCrudOptions {
  entityName?: string
}

interface UseCrudResult<TEntity, TCreateDto, TUpdateDto> {
  items: TEntity[]
  isLoading: boolean
  error: string | null
  fetchAll: () => Promise<void>
  fetchById: (id: string) => Promise<TEntity | null>
  create: (data: TCreateDto) => Promise<TEntity | null>
  update: (id: string, data: TUpdateDto) => Promise<TEntity | null>
  remove: (id: string) => Promise<boolean>
  setItems: (items: TEntity[]) => void
}

export const useCrud = <TEntity, TCreateDto = Partial<TEntity>, TUpdateDto = Partial<TEntity>>(
  apiClient: ApiClient<TEntity, TCreateDto, TUpdateDto>,
  options: UseCrudOptions = {}
): UseCrudResult<TEntity, TCreateDto, TUpdateDto> => {
  const [items, setItems] = useState<TEntity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSuccess, showError } = useNotification()

  const entityName = options.entityName || 'Запис'

  const fetchAll = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await apiClient.getAll()
      setItems(data)
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [apiClient, showError])

  const fetchById = useCallback(
    async (id: string): Promise<TEntity | null> => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await apiClient.getById(id)
        return data
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        showError(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [apiClient, showError]
  )

  const create = useCallback(
    async (data: TCreateDto): Promise<TEntity | null> => {
      try {
        setIsLoading(true)
        setError(null)
        const newItem = await apiClient.create(data)
        setItems((prev) => [...prev, newItem])
        showSuccess(`${entityName} успішно створено`)
        return newItem
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        showError(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [apiClient, entityName, showSuccess, showError]
  )

  const update = useCallback(
    async (id: string, data: TUpdateDto): Promise<TEntity | null> => {
      try {
        setIsLoading(true)
        setError(null)
        const updatedItem = await apiClient.update(id, data)
        setItems((prev) =>
          prev.map((item) =>
            (item as TEntity & { id: string }).id === id ? updatedItem : item
          )
        )
        showSuccess(`${entityName} успішно оновлено`)
        return updatedItem
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        showError(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [apiClient, entityName, showSuccess, showError]
  )

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setIsLoading(true)
        setError(null)
        await apiClient.delete(id)
        setItems((prev) =>
          prev.filter((item) => (item as TEntity & { id: string }).id !== id)
        )
        showSuccess(`${entityName} успішно видалено`)
        return true
      } catch (err) {
        const errorMessage = getErrorMessage(err)
        setError(errorMessage)
        showError(errorMessage)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [apiClient, entityName, showSuccess, showError]
  )

  return {
    items,
    isLoading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    setItems,
  }
}
