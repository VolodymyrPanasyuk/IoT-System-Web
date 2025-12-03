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
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.HOME} element={<HomePage />} />
        <Route path={APP_ROUTES.DEVICES} element={<DevicesListPage />} />
        <Route path={APP_ROUTES.DEVICE_DETAIL} element={<DeviceDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={APP_ROUTES.ADMIN.USERS} element={<UsersPage />} />
          <Route path={APP_ROUTES.ADMIN.ROLES} element={<RolesPage />} />
          <Route path={APP_ROUTES.ADMIN.GROUPS} element={<GroupsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
