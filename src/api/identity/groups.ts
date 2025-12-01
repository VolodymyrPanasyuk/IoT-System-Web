import { identityApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  Group,
  CreateGroupRequest,
  UpdateGroupRequest,
} from '@/types/api/group'

class GroupsApiClient extends ApiClient<Group, CreateGroupRequest, UpdateGroupRequest> {
  constructor() {
    super(identityApi, '/groups')
  }

  async addRole(groupId: string, roleId: string): Promise<void> {
    await this.api.post(`${this.endpoint}/${groupId}/roles/${roleId}`)
  }

  async removeRole(groupId: string, roleId: string): Promise<void> {
    await this.api.delete(`${this.endpoint}/${groupId}/roles/${roleId}`)
  }
}

export const groupsApiClient = new GroupsApiClient()
