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
  data: T
  pagination?: Pagination
  success: boolean
  message: string
}
