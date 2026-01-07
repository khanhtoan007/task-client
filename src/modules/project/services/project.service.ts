import apiClient from '@/utils/api'
import type { APIResponseStandard, PaginatedApiResponse } from '@/types/response'
import type { ProjectResponse, ProjectRequest } from '../cores/type'

export interface ProjectListParams {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  status?: string
  [key: string]: any // Custom filters
}

export const getProjectsByUser = async (
  params?: ProjectListParams
): Promise<PaginatedApiResponse<ProjectResponse>> => {

  const response = await apiClient.get<PaginatedApiResponse<ProjectResponse>>('/projects', {
    params: {
      page: params?.page || 1,
      per_page: params?.per_page || 15,
      ...(params?.search && { search: params.search }),
      ...(params?.sort_by && { sort_by: params.sort_by }),
      ...(params?.sort_order && { sort_order: params.sort_order }),
      ...(params?.status && { status: params.status }),
      // Spread any other custom filters
      ...Object.keys(params || {})
        .filter((key) => !['page', 'per_page', 'search', 'sort_by', 'sort_order', 'status'].includes(key))
        .reduce((acc, key) => ({ ...acc, [key]: params![key] }), {}),
    },
  })
  return response.data
}

export const getProjectsByUserDefault = async (): Promise<APIResponseStandard<ProjectResponse[]>> => {
  const response = await apiClient.get<APIResponseStandard<ProjectResponse[]>>('/projects')
  return response.data
}

export const getProjectById = async (id: string): Promise<APIResponseStandard<ProjectResponse>> => {
  const response = await apiClient.get<APIResponseStandard<ProjectResponse>>(`/projects/${id}`)
  return response.data
}

export const createProject = async (
  data: ProjectRequest
): Promise<APIResponseStandard<ProjectResponse>> => {
  const response = await apiClient.post<APIResponseStandard<ProjectResponse>>('/projects', data)
  return response.data
}

export const updateProject = async (data: ProjectRequest, project_id: string): Promise<APIResponseStandard<ProjectResponse>> => {
  const response = await apiClient.put<APIResponseStandard<ProjectResponse>>(`/projects/${project_id}`, data)
  return response.data
}

export const deleteProject = async (id: string): Promise<APIResponseStandard<any>> => {
  const response = await apiClient.delete<APIResponseStandard<any>>(`/projects/${id}`)
  return response.data
}
