import { systemApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  DeviceAccessPermission,
  CreateDeviceAccessPermissionRequest,
  UpdateDeviceAccessPermissionRequest,
  ValidateAccessResponse,
} from '@/types/api/deviceAccessPermission'

class DeviceAccessPermissionsApiClient extends ApiClient<
  DeviceAccessPermission,
  CreateDeviceAccessPermissionRequest,
  UpdateDeviceAccessPermissionRequest
> {
  constructor() {
    super(systemApi, '/device-access-permissions')
  }

  async getByDevice(deviceId: string): Promise<DeviceAccessPermission[]> {
    const response = await this.api.get<DeviceAccessPermission[]>(
      `${this.endpoint}/device/${deviceId}`
    )
    return response.data
  }

  async validateAccess(deviceId: string): Promise<ValidateAccessResponse> {
    const response = await this.api.get<ValidateAccessResponse>(
      `${this.endpoint}/validate/${deviceId}`
    )
    return response.data
  }
}

export const deviceAccessPermissionsApiClient = new DeviceAccessPermissionsApiClient()
