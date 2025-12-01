import { useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { signalRService } from '@/api/signalr/hubConnection'
import type { ThresholdAlert } from '@/types/api/deviceMeasurement'

interface UseSignalROptions {
  onMeasurementAdded?: (data: unknown) => void
  onMeasurementUpdated?: (data: unknown) => void
  onMeasurementDeleted?: (measurementId: string) => void
  onThresholdExceeded?: (alert: ThresholdAlert) => void
  onDeviceStatusChanged?: (data: { deviceId: string; isActive: boolean }) => void
  autoConnect?: boolean
}

export const useSignalR = (options: UseSignalROptions = {}) => {
  const { isAuthenticated } = useAuth()
  const { showWarning, showError } = useNotification()
  const { autoConnect = true } = options

  const handleThresholdExceeded = useCallback(
    (alert: ThresholdAlert) => {
      // Show notification based on severity
      if (alert.status === 'Critical') {
        showError(`Критичне перевищення порогу: ${alert.fieldName} = ${alert.value}`)
      } else if (alert.status === 'Warning') {
        showWarning(`Попередження: ${alert.fieldName} = ${alert.value}`)
      }

      options.onThresholdExceeded?.(alert)
    },
    [options.onThresholdExceeded, showWarning, showError]
  )

  useEffect(() => {
    if (!isAuthenticated || !autoConnect) return

    const token = sessionStorage.getItem('accessToken')
    if (!token) return

    const connectToHub = async () => {
      try {
        await signalRService.connect(token)

        // Subscribe to events
        if (options.onMeasurementAdded) {
          signalRService.onMeasurementAdded(options.onMeasurementAdded)
        }
        if (options.onMeasurementUpdated) {
          signalRService.onMeasurementUpdated(options.onMeasurementUpdated)
        }
        if (options.onMeasurementDeleted) {
          signalRService.onMeasurementDeleted(options.onMeasurementDeleted)
        }
        if (options.onDeviceStatusChanged) {
          signalRService.onDeviceStatusChanged(options.onDeviceStatusChanged)
        }

        // Завжди підписуємося на threshold alerts
        signalRService.onThresholdExceeded(handleThresholdExceeded)
      } catch (error) {
        console.error('Failed to connect to SignalR:', error)
      }
    }

    connectToHub()

    return () => {
      // Cleanup
      if (options.onMeasurementAdded) {
        signalRService.offMeasurementAdded(options.onMeasurementAdded)
      }
      if (options.onMeasurementUpdated) {
        signalRService.offMeasurementUpdated(options.onMeasurementUpdated)
      }
      if (options.onMeasurementDeleted) {
        signalRService.offMeasurementDeleted(options.onMeasurementDeleted)
      }
      if (options.onDeviceStatusChanged) {
        signalRService.offDeviceStatusChanged(options.onDeviceStatusChanged)
      }
      signalRService.offThresholdExceeded(handleThresholdExceeded)

      signalRService.disconnect()
    }
  }, [isAuthenticated, autoConnect, options, handleThresholdExceeded])

  const subscribeToDevice = useCallback(async (deviceId: string) => {
    await signalRService.subscribeToDevice(deviceId)
  }, [])

  const unsubscribeFromDevice = useCallback(async (deviceId: string) => {
    await signalRService.unsubscribeFromDevice(deviceId)
  }, [])

  return {
    subscribeToDevice,
    unsubscribeFromDevice,
    connectionState: signalRService.getConnectionState(),
  }
}
