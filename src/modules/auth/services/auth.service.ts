import apiClient from '@/utils/api'
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RefreshTokenRequest,
} from '../cores/type'
import type { APIResponseStandard } from '@/types/response'

export const login = async (request: LoginRequest): Promise<APIResponseStandard<LoginResponse>> => {
  const response = await apiClient.post<APIResponseStandard<LoginResponse>>('/auth/login', request)
  return response.data
}

export const register = async (
  request: RegisterRequest
): Promise<APIResponseStandard<LoginResponse>> => {
  const response = await apiClient.post<APIResponseStandard<LoginResponse>>(
    '/auth/register',
    request
  )
  return response.data
}

export const logout = async (): Promise<APIResponseStandard<Record<string, never>>> => {
  const response = await apiClient.post<APIResponseStandard<Record<string, never>>>('/auth/logout')
  return response.data
}

export const refreshToken = async (
  request: RefreshTokenRequest
): Promise<APIResponseStandard<LoginResponse>> => {
  const response = await apiClient.post<APIResponseStandard<LoginResponse>>(
    '/auth/refresh',
    request
  )
  return response.data
}
