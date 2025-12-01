import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { API_ROUTES } from '@/utils/constants'

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // For HttpOnly cookies
  })

  // Request interceptor - adds access token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = sessionStorage.getItem('accessToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor - handles 401 errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // If 401 error, redirect to login
      if (error.response?.status === 401) {
        sessionStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

// Create separate instances for each API
export const identityApi = createApiInstance(`${API_ROUTES.BASE}${API_ROUTES.IDENTITY}`)
export const systemApi = createApiInstance(`${API_ROUTES.BASE}${API_ROUTES.SYSTEM}`)

// Base instance for auth endpoints (without 401 redirect)
export const authApi = axios.create({
  baseURL: `${API_ROUTES.BASE}${API_ROUTES.IDENTITY}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})