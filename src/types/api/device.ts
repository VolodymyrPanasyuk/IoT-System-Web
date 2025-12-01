import type { BaseNamedEntity } from '../common'
import { DataFormat } from '../enums'

export interface Device extends BaseNamedEntity {
    apiKey: string
    dataFormat: DataFormat
    isActive: boolean
    latitude?: number
    longitude?: number
}

export interface CreateDeviceRequest {
    name: string
    description?: string
    dataFormat: DataFormat
    latitude?: number
    longitude?: number
}

export interface UpdateDeviceRequest {
    name?: string
    description?: string
    dataFormat?: DataFormat
    latitude?: number
    longitude?: number
}

export interface RegenerateApiKeyResponse {
    apiKey: string
}