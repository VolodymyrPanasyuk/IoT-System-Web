import { useState, useEffect, useCallback } from 'react'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/helpers'

interface UseApiRequestOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  showSuccessNotification?: boolean
  showErrorNotification?: boolean
  successMessage?: string
}

interface UseApiRequestResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  execute: () => Promise<void>
  setData: (data: T | null) => void
}

export const useApiRequest = <T,>(
  apiCall: () => Promise<T>,
  options: UseApiRequestOptions<T> = {}
): UseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSuccess, showError } = useNotification()

  const execute = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      if (options.showSuccessNotification && options.successMessage) {
        showSuccess(options.successMessage)
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)

      if (options.onError) {
        options.onError(errorMessage)
      }

      if (options.showErrorNotification !== false) {
        showError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }, [apiCall, options, showSuccess, showError])

  return {
    data,
    isLoading,
    error,
    execute,
    setData,
  }
}

// Hook для автоматичного виконання при mount
export const useApiRequestOnMount = <T,>(
  apiCall: () => Promise<T>,
  options: UseApiRequestOptions<T> = {}
): UseApiRequestResult<T> => {
  const result = useApiRequest(apiCall, options)

  useEffect(() => {
    result.execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return result
}
