import { systemApi } from '../base/baseApi'
import type {
  DeviceMeasurement,
  MeasurementWithThresholds,
} from '@/types/api/deviceMeasurement'

class DeviceMeasurementsApiClient {
  private endpoint = '/device-measurements'

  async getAll(): Promise<DeviceMeasurement[]> {
    const response = await systemApi.get<DeviceMeasurement[]>(this.endpoint)
    return response.data
  }

  async getById(id: string): Promise<MeasurementWithThresholds> {
    const response = await systemApi.get<MeasurementWithThresholds>(
      `${this.endpoint}/${id}`
    )
    return response.data
  }

  async getByDevice(deviceId: string): Promise<DeviceMeasurement[]> {
    const response = await systemApi.get<DeviceMeasurement[]>(
      `${this.endpoint}/device/${deviceId}`
    )
    return response.data
  }

  async getByDeviceWithThresholds(deviceId: string): Promise<MeasurementWithThresholds[]> {
    const response = await systemApi.get<MeasurementWithThresholds[]>(
      `${this.endpoint}/device/${deviceId}/with-thresholds`
    )
    return response.data
  }

  async delete(id: string): Promise<void> {
    await systemApi.delete(`${this.endpoint}/${id}`)
  }
}

export const deviceMeasurementsApiClient = new DeviceMeasurementsApiClient()
