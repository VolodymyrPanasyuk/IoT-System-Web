// Base Entity
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Base Named Entity
export interface BaseNamedEntity extends BaseEntity {
    name: string;
    description?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    errors?: string[];
}

// Pagination
export interface PaginationParams {
    pageIndex: number;
    pageSize: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
}

// Sort params
export interface SortParams {
    field: string;
    direction: 'asc' | 'desc';
}

// Filter params
export interface FilterParams {
    [key: string]: string | number | boolean | undefined;
}

// Generic CRUD operations response
export interface CreateResponse {
    id: string;
    message?: string;
}

export interface UpdateResponse {
    success: boolean;
    message?: string;
}

export interface DeleteResponse {
    success: boolean;
    message?: string;
}

// Error response from API
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

// Loading state
export interface LoadingState {
    global: boolean;
    requests: Record<string, boolean>;
}

// Form field error
export interface FieldError {
    field: string;
    message: string;
}

// Select option for dropdowns
export interface SelectOption {
    value: string;
    label: string;
}