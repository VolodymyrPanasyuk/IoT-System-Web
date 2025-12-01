import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr'
import { API_ROUTES, SIGNALR_EVENTS } from '@/utils/constants'
import type { ThresholdAlert } from '@/types/api/deviceMeasurement'

class SignalRService {
  private connection: HubConnection | null = null
  private isConnecting = false

  async connect(accessToken: string): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected || this.isConnecting) {
      return
    }

    this.isConnecting = true

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(`${API_ROUTES.BASE}/hubs/iot`, {
          accessTokenFactory: () => accessToken,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Exponential backoff
            return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000)
          },
        })
        .configureLogging(LogLevel.Information)
        .build()

      await this.connection.start()
      console.log('SignalR connected')
    } catch (error) {
      console.error('SignalR connection error:', error)
      throw error
    } finally {
      this.isConnecting = false
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop()
      this.connection = null
      console.log('SignalR disconnected')
    }
  }

  async subscribeToDevice(deviceId: string): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected) {
      await this.connection.invoke('SubscribeToDevice', deviceId)
      console.log(`Subscribed to device: ${deviceId}`)
    }
  }

  async unsubscribeFromDevice(deviceId: string): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected) {
      await this.connection.invoke('UnsubscribeFromDevice', deviceId)
      console.log(`Unsubscribed from device: ${deviceId}`)
    }
  }

  onMeasurementAdded(callback: (data: unknown) => void): void {
    this.connection?.on(SIGNALR_EVENTS.MEASUREMENT_ADDED, callback)
  }

  onMeasurementUpdated(callback: (data: unknown) => void): void {
    this.connection?.on(SIGNALR_EVENTS.MEASUREMENT_UPDATED, callback)
  }

  onMeasurementDeleted(callback: (measurementId: string) => void): void {
    this.connection?.on(SIGNALR_EVENTS.MEASUREMENT_DELETED, callback)
  }

  onThresholdExceeded(callback: (alert: ThresholdAlert) => void): void {
    this.connection?.on(SIGNALR_EVENTS.THRESHOLD_EXCEEDED, callback)
  }

  onDeviceStatusChanged(callback: (data: { deviceId: string; isActive: boolean }) => void): void {
    this.connection?.on(SIGNALR_EVENTS.DEVICE_STATUS_CHANGED, callback)
  }

  offMeasurementAdded(callback: (data: unknown) => void): void {
    this.connection?.off(SIGNALR_EVENTS.MEASUREMENT_ADDED, callback)
  }

  offMeasurementUpdated(callback: (data: unknown) => void): void {
    this.connection?.off(SIGNALR_EVENTS.MEASUREMENT_UPDATED, callback)
  }

  offMeasurementDeleted(callback: (measurementId: string) => void): void {
    this.connection?.off(SIGNALR_EVENTS.MEASUREMENT_DELETED, callback)
  }

  offThresholdExceeded(callback: (alert: ThresholdAlert) => void): void {
    this.connection?.off(SIGNALR_EVENTS.THRESHOLD_EXCEEDED, callback)
  }

  offDeviceStatusChanged(callback: (data: { deviceId: string; isActive: boolean }) => void): void {
    this.connection?.off(SIGNALR_EVENTS.DEVICE_STATUS_CHANGED, callback)
  }

  getConnectionState(): HubConnectionState | null {
    return this.connection?.state || null
  }
}

export const signalRService = new SignalRService()
