import { ROLE_HIERARCHY, ROLES } from './constants'

export const getRolePriority = (roleName: string): number => {
  return ROLE_HIERARCHY[roleName as keyof typeof ROLE_HIERARCHY] ?? 0
}

export const hasHigherOrEqualRole = (userRole: string, targetRole: string): boolean => {
  const userPriority = getRolePriority(userRole)
  const targetPriority = getRolePriority(targetRole)
  return userPriority >= targetPriority
}

export const getHighestUserRole = (roles: string[]): string | null => {
  if (!roles || roles.length === 0) return null

  return roles.reduce((highest, current) => {
    const highestPriority = getRolePriority(highest)
    const currentPriority = getRolePriority(current)
    return currentPriority > highestPriority ? current : highest
  }, roles[0])
}

export const isSystemRole = (roleName: string): boolean => {
  return Object.values(ROLES).includes(roleName as typeof ROLES[keyof typeof ROLES])
}

export const canManageRole = (userRoles: string[], targetRoleName: string): boolean => {
  const highestUserRole = getHighestUserRole(userRoles)
  if (!highestUserRole) return false

  return hasHigherOrEqualRole(highestUserRole, targetRoleName)
}

export const canManageUser = (userRoles: string[], targetUserRoles: string[]): boolean => {
  const highestUserRole = getHighestUserRole(userRoles)
  const highestTargetRole = getHighestUserRole(targetUserRoles)

  if (!highestUserRole) return false
  if (!highestTargetRole) return true // Можна керувати користувачем без ролей

  return hasHigherOrEqualRole(highestUserRole, highestTargetRole)
}
