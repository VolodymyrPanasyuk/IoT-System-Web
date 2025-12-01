import { identityApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '@/types/api/role'

class RolesApiClient extends ApiClient<Role, CreateRoleRequest, UpdateRoleRequest> {
  constructor() {
    super(identityApi, '/roles')
  }
}

export const rolesApiClient = new RolesApiClient()
