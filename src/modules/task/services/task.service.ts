import apiClient from '@/utils/api'
import type { APIResponseStandard } from '@/types/response'
import type { TaskResponse } from '../cores/type'

export const getTasks = async (project_id: string): Promise<APIResponseStandard<TaskResponse[]>> => {
  const response = await apiClient.get<APIResponseStandard<TaskResponse[]>>(`/projects/${project_id}/tasks`)
  return response.data
}
