import { useAuth } from '@/contexts/AuthContext'
import { canManageRole, canManageUser, getHighestUserRole } from '@/utils/permissions'
import type { User } from '@/types/api/user'
import type { Role } from '@/types/api/role'

export const usePermissions = () => {
  const { user } = useAuth()

  const userRoles = user?.roles || []

  const canManageTargetUser = (targetUser: User): boolean => {
    const targetUserRoles = targetUser.roles.map((r) => r.roleName)
    return canManageUser(userRoles, targetUserRoles)
  }

  const canManageTargetRole = (targetRole: Role): boolean => {
    return canManageRole(userRoles, targetRole.name)
  }

  const canManageTargetRoleName = (targetRoleName: string): boolean => {
    return canManageRole(userRoles, targetRoleName)
  }

  const hasRole = (roleName: string): boolean => {
    return userRoles.includes(roleName)
  }

  const hasAnyRole = (roleNames: string[]): boolean => {
    return roleNames.some((role) => userRoles.includes(role))
  }

  const hasAllRoles = (roleNames: string[]): boolean => {
    return roleNames.every((role) => userRoles.includes(role))
  }

  const getHighestRole = (): string | null => {
    return getHighestUserRole(userRoles)
  }

  return {
    canManageTargetUser,
    canManageTargetRole,
    canManageTargetRoleName,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    getHighestRole,
  }
}
