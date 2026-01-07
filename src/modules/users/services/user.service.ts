import apiClient from '@/utils/api'
import type { APIResponseStandard, PaginatedApiResponse } from '@/types/response'
import type { UserResponse, UserRequest, ContestResponse } from '../cores/type'

export interface UserListParams {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  phone?: string
  contest?: string
  dob?: string
  sex?: string
  [key: string]: any 
}

export const getUsers = async (
  params?: UserListParams
): Promise<PaginatedApiResponse<UserResponse>> => {
  const response = await apiClient.get<PaginatedApiResponse<UserResponse>>('/users/contests', {
    params: {
      page: params?.page || 1,
      per_page: params?.per_page || 15,
      ...(params?.search && { search: params.search }),
      ...(params?.sort_by && { sort_by: params.sort_by }),
      ...(params?.sort_order && { sort_order: params.sort_order }),
      ...(params?.role && { role: params.role }),
      // Spread any other custom filters
      ...Object.keys(params || {})
        .filter((key) => !['page', 'per_page', 'search', 'sort_by', 'sort_order', 'role'].includes(key))
        .reduce((acc, key) => ({ ...acc, [key]: params![key] }), {}),
    },
  })
  return response.data
}

export const getContests = async (
  params?: UserListParams
): Promise<PaginatedApiResponse<ContestResponse>> => {
  const response = await apiClient.get<PaginatedApiResponse<ContestResponse>>('/contests', {
    params: {
      page: params?.page || 1,
      per_page: params?.per_page || 15,
      ...(params?.search && { search: params.search }),
      ...(params?.sort_by && { sort_by: params.sort_by }),
      ...(params?.sort_order && { sort_order: params.sort_order }),
      ...(params?.role && { role: params.role }),
      // Spread any other custom filters
      ...Object.keys(params || {})
        .filter((key) => !['page', 'per_page', 'search', 'sort_by', 'sort_order', 'role'].includes(key))
        .reduce((acc, key) => ({ ...acc, [key]: params![key] }), {}),
    },
  })
  return response.data
}

export const getUserById = async (id: string): Promise<APIResponseStandard<UserResponse>> => {
  const response = await apiClient.get<APIResponseStandard<UserResponse>>(`/users/${id}`)
  return response.data
}

export const createUserContest = async (
  data: UserRequest
): Promise<APIResponseStandard<UserResponse>> => {
  const response = await apiClient.post<APIResponseStandard<UserResponse>>('/users/contests', data)
  return response.data
}

export const updateUser = async (
  data: UserRequest,
  user_id: string
): Promise<APIResponseStandard<UserResponse>> => {
  const response = await apiClient.put<APIResponseStandard<UserResponse>>(`/users/${user_id}`, data)
  return response.data
}

export const deleteUser = async (id: string): Promise<APIResponseStandard<any>> => {
  const response = await apiClient.delete<APIResponseStandard<any>>(`/users/${id}`)
  return response.data
}

