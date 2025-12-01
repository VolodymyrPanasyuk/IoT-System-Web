import { systemApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  FieldMapping,
  CreateFieldMappingRequest,
  UpdateFieldMappingRequest,
} from '@/types/api/fieldMapping'

class FieldMappingsApiClient extends ApiClient<
  FieldMapping,
  CreateFieldMappingRequest,
  UpdateFieldMappingRequest
> {
  constructor() {
    super(systemApi, '/field-mappings')
  }

  async getByDevice(deviceId: string): Promise<FieldMapping[]> {
    const response = await this.api.get<FieldMapping[]>(
      `${this.endpoint}/device/${deviceId}`
    )
    return response.data
  }
}

export const fieldMappingsApiClient = new FieldMappingsApiClient()
