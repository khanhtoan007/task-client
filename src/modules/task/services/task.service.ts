import apiClient from '@/utils/api'
import type { APIResponseStandard } from '@/types/response'
import type { TaskResponse } from '../cores/type'

export const getTasks = async (): Promise<APIResponseStandard<TaskResponse[]>> => {
  const response = await apiClient.get<APIResponseStandard<TaskResponse[]>>('/tasks')
  return response.data
}
