import type { Pagination } from './api';

export interface BasicApiResponse {
  errors?: string;
}

export interface APIResponse<T> {
  items: T[];
  pagination: Pagination;
}

export interface APIResponseError {
  statusCode?: number;
  success: boolean;
  message: string;
}

export interface APIResponseStandard<T = any> {
  data: T;
  statusCode?: number;
  success: boolean;
  message: string;
}
