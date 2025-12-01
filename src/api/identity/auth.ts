import { authApi, identityApi } from '../base/baseApi'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@/types/api/auth'

class AuthApiClient {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials)
    return response.data
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/register', data)
    return response.data
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await identityApi.post<AuthResponse>('/auth/refresh')
    return response.data
  }

  async logout(): Promise<void> {
    await identityApi.post('/auth/logout')
  }
}

export const authApiClient = new AuthApiClient()
