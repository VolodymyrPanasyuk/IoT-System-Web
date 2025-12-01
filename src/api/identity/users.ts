import { identityApi } from '../base/baseApi'
import { ApiClient } from '../base/apiClient'
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
} from '@/types/api/user'

class UsersApiClient extends ApiClient<User, CreateUserRequest, UpdateUserRequest> {
  constructor() {
    super(identityApi, '/users')
  }

  async changePassword(userId: string, data: ChangePasswordRequest): Promise<void> {
    await this.api.put(`${this.endpoint}/${userId}/change-password`, data)
  }

  async addRole(userId: string, roleId: string): Promise<void> {
    await this.api.post(`${this.endpoint}/${userId}/roles/${roleId}`)
  }

  async removeRole(userId: string, roleId: string): Promise<void> {
    await this.api.delete(`${this.endpoint}/${userId}/roles/${roleId}`)
  }

  async addGroup(userId: string, groupId: string): Promise<void> {
    await this.api.post(`${this.endpoint}/${userId}/groups/${groupId}`)
  }

  async removeGroup(userId: string, groupId: string): Promise<void> {
    await this.api.delete(`${this.endpoint}/${userId}/groups/${groupId}`)
  }
}

export const usersApiClient = new UsersApiClient()
