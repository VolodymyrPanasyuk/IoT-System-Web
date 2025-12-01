import type { BaseEntity } from '../common'
import { TransformationType } from '../enums'

export interface FieldMapping extends BaseEntity {
    deviceId: string
    sourceFieldName: string
    targetDeviceFieldId: string
    targetFieldName: string
    transformationType: TransformationType
    transformationConfig?: string
}

export interface CreateFieldMappingRequest {
    deviceId: string
    sourceFieldName: string
    targetDeviceFieldId: string
    transformationType: TransformationType
    transformationConfig?: string
}

export interface UpdateFieldMappingRequest {
    sourceFieldName?: string
    targetDeviceFieldId?: string
    transformationType?: TransformationType
    transformationConfig?: string
}