// API Routes
export const API_ROUTES = {
    BASE: import.meta.env.VITE_API_BASE_URL,
    IDENTITY: '/api/identity',
    SYSTEM: '/api/system',
} as const

// Auth endpoints
export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
} as const

// Roles
export const ROLES = {
    SUPER_ADMIN: 'SuperAdmin',
    ADMIN: 'Admin',
    SCIENTIST: 'Scientist',
    VIEWER: 'Viewer',
} as const

// Role hierarchy (higher number = higher priority)
export const ROLE_HIERARCHY: Record<string, number> = {
    [ROLES.SUPER_ADMIN]: 4,
    [ROLES.ADMIN]: 3,
    [ROLES.SCIENTIST]: 2,
    [ROLES.VIEWER]: 1,
}

// SignalR Events
export const SIGNALR_EVENTS = {
    MEASUREMENT_ADDED: 'MeasurementAdded',
    MEASUREMENT_UPDATED: 'MeasurementUpdated',
    MEASUREMENT_DELETED: 'MeasurementDeleted',
    THRESHOLD_EXCEEDED: 'ThresholdExceeded',
    DEVICE_STATUS_CHANGED: 'DeviceStatusChanged',
} as const

// SignalR Hub URL
export const SIGNALR_HUB_URL = '/hubs/iot'

// App Routes
export const APP_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DEVICES: '/devices',
    DEVICE_DETAIL: '/devices/:id',
    DEVICES_MANAGE: '/devices/manage',
    ADMIN: {
        USERS: '/admin/users',
        ROLES: '/admin/roles',
        GROUPS: '/admin/groups',
        PERMISSIONS: '/admin/permissions',
    },
} as const

// Notification duration (in milliseconds)
export const NOTIFICATION_DURATION = {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 7000,
} as const

// Local storage keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    USER_INFO: 'userInfo',
} as const

export const CLAIM_TYPES = {
    USER_ID: 'sub',
    USERNAME: 'unique_name',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    ROLE_ID: 'role_id',
    ROLE_NAME: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    GROUP_ID: 'group_id',
    GRPOUP_NAME: 'group_name',
    EXPIRES_AT: 'exp'
} as const