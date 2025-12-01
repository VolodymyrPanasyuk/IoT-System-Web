import type { BaseNamedEntity } from '../common'

export interface RoleShort {
    roleId: string
    roleName: string
}

export interface Role extends BaseNamedEntity {
    priority: number
}

export interface CreateRoleRequest {
    name: string
    description?: string
    priority: number
}

export interface UpdateRoleRequest {
    name?: string
    description?: string
    priority?: number
}