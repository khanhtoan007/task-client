import { AxiosError, type AxiosRequestConfig } from 'axios';

export type APIConfig<T> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: T;
  config?: AxiosRequestConfig<T>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  isLoading?: boolean;
  isResponseHeader?: boolean;
  isPublic?: boolean;
  showError?: boolean;
  loadingKey?: string;
  rawErrorResponse?: boolean;
  timezone?: string;
};

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

