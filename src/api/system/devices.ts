import { systemApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  Device,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  RegenerateApiKeyResponse,
} from '@/types/api/device'

class DevicesApiClient extends ApiClient<Device, CreateDeviceRequest, UpdateDeviceRequest> {
  constructor() {
    super(systemApi, '/devices')
  }

  async regenerateApiKey(deviceId: string): Promise<RegenerateApiKeyResponse> {
    const response = await this.api.post<RegenerateApiKeyResponse>(
      `${this.endpoint}/${deviceId}/regenerate-api-key`
    )
    return response.data
  }

  async toggleActive(deviceId: string, isActive: boolean): Promise<Device> {
    const response = await this.api.patch<Device>(
      `${this.endpoint}/${deviceId}/toggle-active`,
      { isActive }
    )
    return response.data
  }
}

export const devicesApiClient = new DevicesApiClient()
