import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { PageLoader } from '@/components/common/PageLoader/PageLoader'
import { APP_ROUTES } from '@/utils/constants'

interface ProtectedRouteProps {
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoader message="Перевірка авторизації..." />
  }

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
