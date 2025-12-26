import { getTasks } from '../services/task.service'
import type { TaskResponse } from './type'
import { TaskStatus } from './type'
import type { APIResponse } from '@/types/response'

export interface GroupedTasks {
  [key: string]: TaskResponse[]
}

export interface BoardController {
  fetchTasks: () => Promise<TaskResponse[]>
  groupTasksByStatus: (tasks: TaskResponse[]) => GroupedTasks
  getTaskCountByStatus: (tasks: TaskResponse[], status: string) => number
}

export const boardController: BoardController = {
  /**
   * Fetch all tasks from the API
   */
  fetchTasks: async (): Promise<TaskResponse[]> => {
    try {
      const response = await getTasks()
      if (response.success && response.data) {
        // Check if data has items property (paginated response)
        const data = response.data as unknown as APIResponse<TaskResponse>
        if (data && 'items' in data && Array.isArray(data.items)) {
          return data.items
        }
        // Fallback: if data is directly an array (backward compatibility)
        if (Array.isArray(response.data)) {
          return response.data
        }
      }
      return []
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  },

  /**
   * Group tasks by their status
   */
  groupTasksByStatus: (tasks: TaskResponse[]): GroupedTasks => {
    const grouped: GroupedTasks = {
      [TaskStatus.PENDING]: [],
      [TaskStatus.PROCESSING]: [],
      [TaskStatus.COMPLETED]: [],
      [TaskStatus.CANCELLED]: [],
    }

    tasks.forEach((task) => {
      const status = String(task.status).toLowerCase()
      // Map API status to TaskStatus enum
      const mappedStatus = mapApiStatusToTaskStatus(status)
      if (mappedStatus && grouped[mappedStatus]) {
        grouped[mappedStatus].push(task)
      }
    })

    return grouped
  },

  /**
   * Get the count of tasks for a specific status
   */
  getTaskCountByStatus: (tasks: TaskResponse[], status: string): number => {
    return tasks.filter((task) => {
      const taskStatus = String(task.status).toLowerCase()
      const mappedStatus = mapApiStatusToTaskStatus(taskStatus)
      return mappedStatus === status
    }).length
  },
}

/**
 * Map API status values to TaskStatus enum values
 */
const mapApiStatusToTaskStatus = (apiStatus: string): string | null => {
  const statusMap: Record<string, string> = {
    pending: TaskStatus.PENDING,
    in_progress: TaskStatus.PROCESSING,
    processing: TaskStatus.PROCESSING,
    completed: TaskStatus.COMPLETED,
    cancelled: TaskStatus.CANCELLED,
    canceled: TaskStatus.CANCELLED,
  }

  return statusMap[apiStatus] || null
}
