import type { BaseEntity } from '../common'
import { DevicePermissionType } from '../enums'

export interface DeviceAccessPermission extends BaseEntity {
    deviceId: string
    deviceName: string
    userId?: string
    userName?: string
    groupId?: string
    groupName?: string
    permissionType: DevicePermissionType
}

export interface CreateDeviceAccessPermissionRequest {
    deviceId: string
    userId?: string
    groupId?: string
    permissionType: DevicePermissionType
}

export interface UpdateDeviceAccessPermissionRequest {
    permissionType?: DevicePermissionType
}

export interface ValidateAccessResponse {
    hasAccess: boolean
    permissionType?: DevicePermissionType
    reason?: string
}