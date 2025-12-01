import { systemApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  DeviceField,
  CreateDeviceFieldRequest,
  UpdateDeviceFieldRequest,
} from '@/types/api/deviceField'

class DeviceFieldsApiClient extends ApiClient<
  DeviceField,
  CreateDeviceFieldRequest,
  UpdateDeviceFieldRequest
> {
  constructor() {
    super(systemApi, '/device-fields')
  }

  async getByDevice(deviceId: string): Promise<DeviceField[]> {
    const response = await this.api.get<DeviceField[]>(
      `${this.endpoint}/device/${deviceId}`
    )
    return response.data
  }
}

export const deviceFieldsApiClient = new DeviceFieldsApiClient()
