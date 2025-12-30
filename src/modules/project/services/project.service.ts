import apiClient from '@/utils/api'
import type { APIResponseStandard } from '@/types/response'
import type { ProjectResponse, ProjectRequest } from '../cores/type'

export const getProjectsByUser = async (): Promise<APIResponseStandard<ProjectResponse[]>> => {
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
