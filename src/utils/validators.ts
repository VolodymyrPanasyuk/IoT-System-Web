import { z } from 'zod'

export const loginSchema = z.object({
  userName: z.string().min(3, 'Ім\'я користувача має містити мінімум 3 символи'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
})

export const registerSchema = z.object({
  userName: z.string().min(3, 'Ім\'я користувача має містити мінімум 3 символи'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
  firstName: z.string().min(2, 'Ім\'я має містити мінімум 2 символи'),
  lastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи'),
})

export const createUserSchema = z.object({
  userName: z.string().min(3, 'Ім\'я користувача має містити мінімум 3 символи'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
  firstName: z.string().min(2, 'Ім\'я має містити мінімум 2 символи'),
  lastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи'),
  roleIds: z.array(z.string()).optional(),
  groupIds: z.array(z.string()).optional(),
})

export const updateUserSchema = z.object({
  firstName: z.string().min(2, 'Ім\'я має містити мінімум 2 символи').optional(),
  lastName: z.string().min(2, 'Прізвище має містити мінімум 2 символи').optional(),
  roleIds: z.array(z.string()).optional(),
  groupIds: z.array(z.string()).optional(),
})

export const createRoleSchema = z.object({
  name: z.string().min(2, 'Назва має містити мінімум 2 символи'),
  description: z.string().optional(),
  priority: z.number().min(0, 'Пріоритет має бути не менше 0'),
})

export const createGroupSchema = z.object({
  name: z.string().min(2, 'Назва має містити мінімум 2 символи'),
  description: z.string().optional(),
  roleIds: z.array(z.string()).optional(),
})

export const createDeviceSchema = z.object({
  name: z.string().min(2, 'Назва має містити мінімум 2 символи'),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isActive: z.boolean().optional(),
})

export const createDeviceFieldSchema = z.object({
  deviceId: z.string().uuid('Невірний формат ID пристрою'),
  fieldName: z.string().min(1, 'Назва поля обов\'язкова'),
  dataType: z.number(),
  unit: z.string().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  warningMinValue: z.number().optional(),
  warningMaxValue: z.number().optional(),
  criticalMinValue: z.number().optional(),
  criticalMaxValue: z.number().optional(),
})

export const createFieldMappingSchema = z.object({
  deviceId: z.string().uuid('Невірний формат ID пристрою'),
  fieldId: z.string().uuid('Невірний формат ID поля'),
  sourcePath: z.string().min(1, 'Шлях до джерела обов\'язковий'),
  transformationType: z.number(),
  transformationConfig: z.string().optional(),
})

export const createMeasurementDateMappingSchema = z.object({
  deviceId: z.string().uuid('Невірний формат ID пристрою'),
  sourcePath: z.string().min(1, 'Шлях до джерела обов\'язковий'),
  transformationType: z.number(),
  transformationConfig: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type CreateUserFormData = z.infer<typeof createUserSchema>
export type UpdateUserFormData = z.infer<typeof updateUserSchema>
export type CreateRoleFormData = z.infer<typeof createRoleSchema>
export type CreateGroupFormData = z.infer<typeof createGroupSchema>
export type CreateDeviceFormData = z.infer<typeof createDeviceSchema>
export type CreateDeviceFieldFormData = z.infer<typeof createDeviceFieldSchema>
export type CreateFieldMappingFormData = z.infer<typeof createFieldMappingSchema>
export type CreateMeasurementDateMappingFormData = z.infer<typeof createMeasurementDateMappingSchema>
