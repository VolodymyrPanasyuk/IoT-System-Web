import type { BaseEntity } from '../common'

export interface UserShort {
    userId: string
    userName: string
}

export interface UserRole {
    roleId: string
    roleName: string
}

export interface UserGroup {
    groupId: string
    groupName: string
}

export interface User extends BaseEntity {
    userName: string
    firstName: string
    lastName: string
    roles: UserRole[]
    groups: UserGroup[]
}

export interface CreateUserRequest {
    userName: string
    password: string
    firstName: string
    lastName: string
    roleIds?: string[]
    groupIds?: string[]
}

export interface UpdateUserRequest {
    firstName?: string
    lastName?: string
    roleIds?: string[]
    groupIds?: string[]
}

export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
}