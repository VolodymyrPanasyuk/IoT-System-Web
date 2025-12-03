import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authApiClient } from '@/api/identity/auth'
import type {
  AuthContextType,
  UserInfo,
  LoginRequest,
  RegisterRequest,
} from '@/types/api/auth'
import { useNotification } from './NotificationContext'
import { APP_ROUTES } from '@/utils/constants'
import { decodeToken, JwtPayloadToUserInfo } from '@/utils/helpers'
import { isAfter } from 'date-fns'
import { useLoadingStore } from '@/store/loadingStore'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(JwtPayloadToUserInfo(decodeToken(sessionStorage.getItem('accessToken'))))

  const navigate = useNavigate()
  const { showError, showSuccess } = useNotification()
  const location = useLocation();
  const loadingStore = useLoadingStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = decodeToken(sessionStorage.getItem('accessToken'))
      if (token && isAfter(token.exp, new Date())
        && !([APP_ROUTES.LOGIN, APP_ROUTES.REGISTER] as string[]).includes(location.pathname)
      ) {
        try {
          await refreshToken()
        } catch (error) {
          navigate(APP_ROUTES.LOGIN)
        }
      }
    }

    initAuth()
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      loadingStore.startLoading(login.name);
      const response = await authApiClient.login(credentials)

      sessionStorage.setItem('accessToken', response.accessToken)
      setUser(JwtPayloadToUserInfo(decodeToken(response.accessToken)));

      showSuccess('Успішний вхід!')
      navigate(APP_ROUTES.HOME)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Помилка входу'
      showError(message)
      throw error
    } finally {
      loadingStore.stopLoading(login.name);
    }
  }, [navigate, showError, showSuccess])

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      loadingStore.startLoading(register.name);
      const response = await authApiClient.register(data)

      sessionStorage.setItem('accessToken', response.accessToken)
      setUser(JwtPayloadToUserInfo(decodeToken(response.accessToken)));

      showSuccess('Реєстрація успішна!')
      navigate(APP_ROUTES.HOME)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Помилка реєстрації'
      showError(message)
      throw error
    } finally {
      loadingStore.stopLoading(register.name);
    }
  }, [navigate, showError, showSuccess])

  const refreshToken = async () => {
    try {
      if (loadingStore.isLoading(refreshToken.name)) return false;
      loadingStore.startLoading(refreshToken.name);

      const response = await authApiClient.refreshToken()

      sessionStorage.setItem('accessToken', response.accessToken)
      setUser(JwtPayloadToUserInfo(decodeToken(response.accessToken)));

      return true
    }
    catch (error) {
      sessionStorage.removeItem('accessToken')
      setUser(null)
      return false
    }
    finally {
      loadingStore.stopLoading(refreshToken.name);
    }
  };

  const logout = useCallback(async () => {
    try {
      await authApiClient.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      sessionStorage.removeItem('accessToken')
      setUser(null)
      showSuccess('Ви успішно вийшли')
      navigate(APP_ROUTES.LOGIN)
    }
  }, [navigate, showSuccess])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: loadingStore.isLoading(login.name) || loadingStore.isLoading(register.name),
    login,
    register,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
