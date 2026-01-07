import type { Pagination } from './api'

export interface BasicApiResponse {
  errors?: string
}

export interface APIResponse<T> {
  items: T[]
  pagination: Pagination
}

export interface APIResponseError {
  success: boolean
  message: string
}

export interface APIResponseStandard<T = any> {
  success: boolean
  message: string
  data: T
  pagination?: Pagination
}

export interface PaginatedApiResponse<T = any> {
  success: boolean
  message: string
  data: T[]
  pagination: {
    page: number
    per_page: number
    total: number
    last_page: number
    from: number
    to: number
  }
}