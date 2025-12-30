import { useEffect, useState, useCallback } from 'react'
import type { ProjectResponse } from '@/modules/project/cores/type'
import { getProjectsByUser, getProjectById } from '@/modules/project/services/project.service'
import type { APIResponseStandard } from '@/types'
import { Tag } from 'antd'
import type { ColumnProps } from 'antd/es/table'
import { ProjectStatus } from './type'

export const useProjectController = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = useCallback(async (): Promise<APIResponseStandard<ProjectResponse[]>> => {
    try {
      const response = await getProjectsByUser()
      return response
    } catch (error) {
      console.error('Error fetching projects:', error)
      return {
        data: [] as ProjectResponse[],
        success: false,
        message: 'Failed to fetch projects',
      } as APIResponseStandard<ProjectResponse[]>
    }
  }, [])

  const fetchProjectById = useCallback(
    async (id: string): Promise<APIResponseStandard<ProjectResponse>> => {
      try {
        const response = await getProjectById(id)
        return response
      } catch (error) {
        console.error('Error fetching project:', error)
        return {
          data: {} as ProjectResponse,
          success: false,
          message: 'Failed to fetch project',
        } as APIResponseStandard<ProjectResponse>
      }
    },
    []
  )

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await loadProjects()
        if (response.success) {
          setProjects(response.data)
        } else {
          setError(response.message || 'Failed to fetch projects')
        }
      } catch (err) {
        console.error('Error loading projects:', err)
        setError('Failed to fetch projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [loadProjects])

  const columns: ColumnProps<ProjectResponse>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === ProjectStatus.ACTIVE ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Lead',
      dataIndex: 'created_by',
      key: 'created_by',
    },
  ]

  const refetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loadProjects()
      if (response.success) {
        setProjects(response.data)
      } else {
        setError(response.message || 'Failed to fetch projects')
      }
    } catch (err) {
      console.error('Error loading projects:', err)
      setError('Failed to fetch projects')
    } finally {
      setIsLoading(false)
    }
  }, [loadProjects])

  return {
    projects,
    isLoading,
    error,
    fetchProjectById,
    columns,
    refetchProjects,
  }
}
