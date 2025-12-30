export interface ProjectStatus {
  DRAFT: string
  ACTIVE: string
  INACTIVE: string
  COMPLETED: string
  CANCELLED: string
}

export const ProjectStatus: ProjectStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export interface ProjectResponse {
  id: string
  name: string
  description: string
  created_by: string
  status: ProjectStatus
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface ProjectRequest {
  name: string
  description: string
  status?: ProjectStatus
  start_date: string
  end_date: string
}
