import { AxiosError } from 'axios'
import { jwtDecode } from "jwt-decode";
import { DataFormat, FieldDataType, TransformationType } from '@/types/enums'
import type { JwtPayload } from '@/types/api/jwtPayload';
import type { UserInfo } from '@/types';
import { CLAIM_TYPES } from './constants';

export function decodeToken(token: string | null | undefined): JwtPayload | null {
  return token ? jwtDecode<JwtPayload>(token) : null;
}

export function JwtPayloadToUserInfo(jwtPayload: JwtPayload | null): UserInfo | null {
  if (jwtPayload === null) return null;

  return {
    id: jwtPayload[CLAIM_TYPES.USER_ID],
    userName: jwtPayload[CLAIM_TYPES.USERNAME],
    firstName: jwtPayload[CLAIM_TYPES.FIRST_NAME],
    lastName: jwtPayload[CLAIM_TYPES.LAST_NAME],
    roles: jwtPayload[CLAIM_TYPES.ROLE_NAME]
  } as UserInfo;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'Невідома помилка'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Невідома помилка'
}

export const getDataFormatLabel = (format: DataFormat): string => {
  const labels: Record<DataFormat, string> = {
    [DataFormat.JSON]: 'JSON',
    [DataFormat.XML]: 'XML',
    [DataFormat.CSV]: 'CSV',
    [DataFormat.PlainText]: 'Простий текст',
  }
  return labels[format] || 'Невідомо'
}

export const getFieldDataTypeLabel = (type: FieldDataType): string => {
  const labels: Record<FieldDataType, string> = {
    [FieldDataType.Number]: 'Число',
    [FieldDataType.Text]: 'Текст',
    [FieldDataType.Boolean]: 'Логічне значення',
    [FieldDataType.DateTime]: 'Дата та час',
  }
  return labels[type] || 'Невідомо'
}

export const getTransformationTypeLabel = (type: TransformationType): string => {
  const labels: Record<TransformationType, string> = {
    [TransformationType.None]: 'Без трансформації',
    [TransformationType.ToUpper]: 'До верхнього регістру',
    [TransformationType.ToLower]: 'До нижнього регістру',
    [TransformationType.Trim]: 'Обрізати пробіли',
    [TransformationType.TrimStart]: 'Обрізати пробіли на початку',
    [TransformationType.TrimEnd]: 'Обрізати пробіли в кінці',
    [TransformationType.RemoveWhitespace]: 'Видалити всі пробіли',
    [TransformationType.ToString]: 'Перетворити на рядок',
    [TransformationType.Round]: 'Округлити',
    [TransformationType.Floor]: 'Округлити вниз',
    [TransformationType.Ceiling]: 'Округлити вгору',
    [TransformationType.CelsiusToFahrenheit]: 'Цельсій → Фаренгейт',
    [TransformationType.FahrenheitToCelsius]: 'Фаренгейт → Цельсій',
    [TransformationType.MetersToFeet]: 'Метри → Фути',
    [TransformationType.FeetToMeters]: 'Фути → Метри',
    [TransformationType.KilogramsToPounds]: 'Кілограми → Фунти',
    [TransformationType.PoundsToKilograms]: 'Фунти → Кілограми',
    [TransformationType.Reverse]: '',
    [TransformationType.Replace]: '',
    [TransformationType.Substring]: '',
    [TransformationType.Concat]: '',
    [TransformationType.Split]: '',
    [TransformationType.Add]: '',
    [TransformationType.Subtract]: '',
    [TransformationType.Multiply]: '',
    [TransformationType.Divide]: '',
    [TransformationType.Modulo]: '',
    [TransformationType.Power]: '',
    [TransformationType.SquareRoot]: '',
    [TransformationType.Absolute]: '',
    [TransformationType.ToInt]: '',
    [TransformationType.ToDouble]: '',
    [TransformationType.ToBoolean]: '',
    [TransformationType.ToDateTime]: '',
    [TransformationType.FormatDateTime]: '',
    [TransformationType.AddDays]: '',
    [TransformationType.AddHours]: '',
    [TransformationType.AddMinutes]: '',
    [TransformationType.KilometersToMiles]: '',
    [TransformationType.MilesToKilometers]: '',
    [TransformationType.CustomFormula]: '',
    [TransformationType.JsonExtract]: ''
  }
  return labels[type] || 'Невідомо'
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export const downloadFile = (content: string, filename: string, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}