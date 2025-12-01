import { systemApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  MeasurementDateMapping,
  CreateMeasurementDateMappingRequest,
  UpdateMeasurementDateMappingRequest,
} from '@/types/api/measurementDateMapping'

class MeasurementDateMappingsApiClient extends ApiClient<
  MeasurementDateMapping,
  CreateMeasurementDateMappingRequest,
  UpdateMeasurementDateMappingRequest
> {
  constructor() {
    super(systemApi, '/measurement-date-mappings')
  }

  async getByDevice(deviceId: string): Promise<MeasurementDateMapping | null> {
    try {
      const response = await this.api.get<MeasurementDateMapping>(
        `${this.endpoint}/device/${deviceId}`
      )
      return response.data
    } catch (error) {
      // Якщо не знайдено, повертаємо null
      return null
    }
  }
}

export const measurementDateMappingsApiClient = new MeasurementDateMappingsApiClient()
