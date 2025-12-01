import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { uk } from 'date-fns/locale'

export const formatDate = (date: string | Date, formatStr = 'dd.MM.yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr, { locale: uk })
  } catch (error) {
    return 'Невідома дата'
  }
}

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd.MM.yyyy HH:mm:ss')
}

export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'HH:mm:ss')
}

export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: uk })
  } catch (error) {
    return 'Невідомо'
  }
}

export const isDateExpired = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return dateObj < new Date()
  } catch (error) {
    return false
  }
}
