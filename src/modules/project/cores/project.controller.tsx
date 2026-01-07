import { useState, useCallback, useMemo } from 'react'
import type { ProjectResponse } from '@/modules/project/cores/type'
import { getProjectsByUser, getProjectById, deleteProject, type ProjectListParams, getProjectsByUserDefault } from '@/modules/project/services/project.service'
import type { APIResponseStandard } from '@/types'
import { Button, Space, Tag } from 'antd'
import type { ColumnProps, TableProps } from 'antd/es/table'
import type { TablePaginationConfig } from 'antd'
import type { FilterValue } from 'antd/es/table/interface'
import type { SorterResult } from 'antd/es/table/interface'
import { ProjectStatus } from './type'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'

type UseProjectControllerOptions = {
  onEditProject?: (project: ProjectResponse) => void
}

export const useProjectController = (options: UseProjectControllerOptions = {}) => {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<ProjectResponse | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [search, setSearch] = useState('')
  const { onEditProject } = options

  const loadProjects = useCallback(async (params?: ProjectListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const requestParams: ProjectListParams = params || {
        page: pagination.current,
        per_page: pagination.pageSize,
        ...(search && { search }),
      }
      const response = await getProjectsByUser(requestParams)
      // const response = await getProjectsByUserDefault();
      if (response.success) {
      setProjects(response.data);
        // setPagination({
        //   current: response.pagination.page,
        //   pageSize: response.pagination.per_page,
        //   total: response.pagination.total,
        // })
      } else {
        setError(response.message || 'Failed to fetch projects')
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to fetch projects')
    } finally {
      setIsLoading(false)
    }
  }, [pagination.current, pagination.pageSize, search])

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

  const refetchProjects = useCallback(async (params?: ProjectListParams) => {
    await loadProjects(params)
  }, [loadProjects])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (!value) {
      refetchProjects({ search: '', page: 1 })
    }
  }, [refetchProjects])

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    refetchProjects({ search: value, page: 1 })
  }, [refetchProjects])

  const handleTableChange: TableProps<ProjectResponse>['onChange'] = useCallback((
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ProjectResponse> | SorterResult<ProjectResponse>[]
  ) => {
    const params: ProjectListParams = {
      page: pagination.current,
      per_page: pagination.pageSize,
    }

    if (search) {
      params.search = search
    }

    if (sorter && !Array.isArray(sorter) && sorter.order) {
      params.sort_by = sorter.field as string
      params.sort_order = sorter.order === 'ascend' ? 'asc' : 'desc'
      params.page = 1
    } else {
      params.page = pagination.current || 1
    }

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key]
      if (filterValue) {
        params[key] = Array.isArray(filterValue)
          ? filterValue[0]
          : filterValue
      }
    })

    refetchProjects(params)
  }, [search, refetchProjects])

  const handleEditProject = useCallback(
    (project: ProjectResponse, e?: React.MouseEvent) => {
      e?.stopPropagation()
      onEditProject?.(project)
    },
    [onEditProject]
  )

  const openConfirmModal = useCallback((project: ProjectResponse, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setProjectToDelete(project)
    setIsConfirmModalOpen(true)
  }, [])

  const closeConfirmModal = useCallback(() => {
    setIsConfirmModalOpen(false)
    setProjectToDelete(null)
  }, [])

  const handleDeleteProject = useCallback(async () => {
    if (!projectToDelete?.id) return
    
    try {
      const response = await deleteProject(projectToDelete.id)
      if (response.success) {
        toast.success('Project deleted successfully!')
        closeConfirmModal()
        const params: ProjectListParams = {
          page: pagination.current,
          per_page: pagination.pageSize,
        }
        if (search) {
          params.search = search
        }
        refetchProjects(params)
      } else {
        toast.error(response.message || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project. Please try again.')
    }
  }, [projectToDelete, refetchProjects, pagination.current, pagination.pageSize, search, closeConfirmModal])

  const columns: ColumnProps<ProjectResponse>[] = useMemo(() => [
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      sorter: true,
      render: (created_at: string) => dayjs(created_at).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === ProjectStatus.ACTIVE ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Lead',
      dataIndex: 'created_by.name',
      key: 'created_by.name',
      width: 150,
      render: (_, record: ProjectResponse) => (
        <Link to={`/users/${record.created_by.id}`} onClick={(e) => e.stopPropagation()}>
          {record.created_by.name}
        </Link>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions', 
      key: 'actions',
      width: 100,
      render: (_, record: ProjectResponse) => (
        <Space onClick={(e) => e.stopPropagation()}>          
          <Button type="primary" icon={<EditOutlined />} onClick={(e) => handleEditProject(record, e)} />
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={(e) => openConfirmModal(record, e)} />
        </Space>
      ),
    },
  ], [handleEditProject, openConfirmModal])

  return {
    projects,
    isLoading,
    error,
    fetchProjectById,
    columns,
    refetchProjects,
    pagination,
    search,
    handleSearch,
    handleSearchChange,
    handleTableChange,
    isConfirmModalOpen,
    closeConfirmModal,
    handleDeleteProject,
  }
}
