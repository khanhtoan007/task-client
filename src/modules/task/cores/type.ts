export interface TaskStatus {
  PENDING: string
  PROCESSING: string
  COMPLETED: string
  CANCELLED: string
}

export const TaskStatus: TaskStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export interface TaskResponse {
  id: string
  title: string
  description: string
  user_id: string
  status: TaskStatus
  created_at: string
  updated_at: string
}
