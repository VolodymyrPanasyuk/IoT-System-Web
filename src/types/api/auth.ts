import type { BaseEntity } from '../common'

export interface LoginRequest {
    userName: string
    password: string
}

export interface RegisterRequest {
    userName: string
    password: string
    firstName: string
    lastName: string
}

export interface AuthResponse {
    accessToken: string
    expiresAt: Date
}

export interface UserInfo extends BaseEntity {
    userName: string
    firstName: string
    lastName: string
    roles: string[]
    roleIds: string[]
    groupIds: string[]
    groupNames: string[]
}

export interface AuthContextType {
    user: UserInfo | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (credentials: LoginRequest) => Promise<void>
    register: (data: RegisterRequest) => Promise<void>
    logout: () => void
    refreshToken: () => Promise<boolean>
}