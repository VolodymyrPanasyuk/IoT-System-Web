import type { BaseNamedEntity } from '../common'
import { FieldDataType } from '../enums'

export interface DeviceField extends BaseNamedEntity {
    deviceId: string
    dataType: FieldDataType
    unit?: string
    thresholdMin?: number
    thresholdMax?: number
    warningThresholdMin?: number
    warningThresholdMax?: number
    criticalThresholdMin?: number
    criticalThresholdMax?: number
}

export interface CreateDeviceFieldRequest {
    name: string
    description?: string
    deviceId: string
    dataType: FieldDataType
    unit?: string
    thresholdMin?: number
    thresholdMax?: number
    warningThresholdMin?: number
    warningThresholdMax?: number
    criticalThresholdMin?: number
    criticalThresholdMax?: number
}

export interface UpdateDeviceFieldRequest {
    name?: string
    description?: string
    dataType?: FieldDataType
    unit?: string
    thresholdMin?: number
    thresholdMax?: number
    warningThresholdMin?: number
    warningThresholdMax?: number
    criticalThresholdMin?: number
    criticalThresholdMax?: number
}