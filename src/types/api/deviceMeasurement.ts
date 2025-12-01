import type { BaseEntity } from '../common'
import { ThresholdStatus } from '../enums'

export interface FieldMeasurementValue extends BaseEntity {
    deviceMeasurementId: string
    deviceFieldId: string
    fieldName: string
    value: string
    numericValue?: number
}

export interface DeviceMeasurement extends BaseEntity {
    deviceId: string
    measurementDate: string
    values: FieldMeasurementValue[]
}

export interface ThresholdAlert {
    fieldName: string
    status: ThresholdStatus
    value: number
    threshold: number
    message: string
}

export interface MeasurementWithThresholds extends DeviceMeasurement {
    thresholdStatuses: ThresholdAlert[]
}

export interface CreateDeviceMeasurementRequest {
    deviceId: string
    measurementDate: string
    values: {
        deviceFieldId: string
        value: string
    }[]
}