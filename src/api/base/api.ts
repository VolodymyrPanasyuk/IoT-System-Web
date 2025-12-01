import { AxiosError, type AxiosRequestConfig } from 'axios'

export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipErrorHandling?: boolean
}

export interface ApiErrorResponse {
  message: string
  errors?: string[]
  statusCode?: number
}

export class ApiError extends Error {
  statusCode?: number
  errors?: string[]

  constructor(message: string, statusCode?: number, errors?: string[]) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true
}

export interface ICrudApi<TEntity, TCreateDto, TUpdateDto> {
  getAll(): Promise<TEntity[]>
  getById(id: string): Promise<TEntity>
  create(dto: TCreateDto): Promise<TEntity>
  update(id: string, dto: TUpdateDto): Promise<TEntity>
  delete(id: string): Promise<void>
}
