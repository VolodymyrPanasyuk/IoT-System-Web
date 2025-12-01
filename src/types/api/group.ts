import type { BaseNamedEntity } from '../common'

export interface GroupShort {
    groupId: string
    groupName: string
}

export interface GroupRole {
    roleId: string
    roleName: string
}

export interface Group extends BaseNamedEntity {
    roles: GroupRole[]
}

export interface CreateGroupRequest {
    name: string
    description?: string
    roleIds?: string[]
}

export interface UpdateGroupRequest {
    name?: string
    description?: string
    roleIds?: string[]
}