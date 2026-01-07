export interface ProjectStatus {
  DRAFT: string
  ACTIVE: string
  ON_HOLD: string
  ARCHIVED: string
  COMPLETED: string
  CANCELLED: string
}
//    case DRAFT = 'draft';
// case ACTIVE = 'active';
// case ON_HOLD = 'on_hold';
// case COMPLETED = 'completed';
// case ARCHIVED = 'archived';
// case CANCELLED = 'cancelled';
export const ProjectStatus: ProjectStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled',
}

export interface ProjectResponse {
  id: string
  name: string
  description: string
  created_by: {
    id: string
    name: string
    email: string
  }
  status: ProjectStatus
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface ProjectRequest {
  name: string
  description: string
  status: ProjectStatus | string
  start_date: string
  end_date: string
}
