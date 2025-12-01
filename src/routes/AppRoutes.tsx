import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { UsersPage } from '@/pages/admin/UsersPage'
import { RolesPage } from '@/pages/admin/RolesPage'
import { GroupsPage } from '@/pages/admin/GroupsPage'
import { DevicesListPage } from '@/pages/devices/DevicesListPage'
import { DeviceDetailPage } from '@/pages/devices/DeviceDetailPage'
import { APP_ROUTES } from '@/utils/constants'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes без layout */}
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

      {/* Routes з layout */}
      <Route element={<AppLayout><Routes><Route path="*" element={null} /></Routes></AppLayout>}>
        {/* Public routes */}
        <Route path={APP_ROUTES.HOME} element={<HomePage />} />
        <Route path={APP_ROUTES.DEVICES} element={<DevicesListPage />} />
        <Route path="/devices/:id" element={<DeviceDetailPage />} />

        {/* Protected routes - Admin */}
        <Route
          path={APP_ROUTES.ADMIN.USERS}
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.ADMIN.ROLES}
          element={
            <ProtectedRoute>
              <RolesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.ADMIN.GROUPS}
          element={
            <ProtectedRoute>
              <GroupsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
