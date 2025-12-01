import type { BaseEntity } from '../common'

export interface MeasurementDateMapping extends BaseEntity {
    deviceId: string
    sourceFieldName: string
    dateFormat?: string
}

export interface CreateMeasurementDateMappingRequest {
    deviceId: string
    sourceFieldName: string
    dateFormat?: string
}

export interface UpdateMeasurementDateMappingRequest {
    sourceFieldName?: string
    dateFormat?: string
}