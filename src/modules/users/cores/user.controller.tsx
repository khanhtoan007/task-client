import { useState, useCallback, useMemo } from 'react'
import type { UserResponse } from './type'
import { getUsers, getUserById, deleteUser, type UserListParams } from '../services/user.service'
import type { APIResponseStandard } from '@/types'
import { Button, Space } from 'antd'
import type { ColumnProps, TableProps } from 'antd/es/table'
import type { TablePaginationConfig } from 'antd'
import type { FilterValue } from 'antd/es/table/interface'
import type { SorterResult } from 'antd/es/table/interface'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

type UseUserControllerOptions = {
  onEditUser?: (user: UserResponse) => void
}

export const useUserController = (options: UseUserControllerOptions = {}) => {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [search, setSearch] = useState('')
  const { onEditUser } = options

  const loadUsers = useCallback(async (params?: UserListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const requestParams: UserListParams = params || {
        page: pagination.current,
        per_page: pagination.pageSize,
        ...(search && { search }),
      }
      const response = await getUsers(requestParams)
      if (response.success) {
        setUsers(response.data)
        setPagination({
          current: response.pagination.page,
          pageSize: response.pagination.per_page,
          total: response.pagination.total,
        })
      } else {
        setError(response.message || 'Failed to fetch users')
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to fetch users')
    } finally {
      setIsLoading(false)
    }
  }, [pagination.current, pagination.pageSize, search])

  const fetchUserById = useCallback(
    async (id: string): Promise<APIResponseStandard<UserResponse>> => {
      try {
        const response = await getUserById(id)
        return response
      } catch (error) {
        console.error('Error fetching user:', error)
        return {
          data: {} as UserResponse,
          success: false,
          message: 'Failed to fetch user',
        } as APIResponseStandard<UserResponse>
      }
    },
    []
  )

  const refetchUsers = useCallback(async (params?: UserListParams) => {
    await loadUsers(params)
  }, [loadUsers])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (!value) {
      refetchUsers({ search: '', page: 1 })
    }
  }, [refetchUsers])

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    refetchUsers({ search: value, page: 1 })
  }, [refetchUsers])

  const handleTableChange: TableProps<UserResponse>['onChange'] = useCallback((
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserResponse> | SorterResult<UserResponse>[]
  ) => {
    const params: UserListParams = {
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

    refetchUsers(params)
  }, [search, refetchUsers])

  const handleEditUser = useCallback(
    (user: UserResponse, e?: React.MouseEvent) => {
      e?.stopPropagation()
      onEditUser?.(user)
    },
    [onEditUser]
  )

  const handleDeleteUser = useCallback(async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    try {
      const response = await deleteUser(id)
      if (response.success) {
        toast.success('User deleted successfully!')
        const params: UserListParams = {
          page: pagination.current,
          per_page: pagination.pageSize,
        }
        if (search) {
          params.search = search
        }
        refetchUsers(params)
      } else {
        toast.error(response.message || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user. Please try again.')
    }
  }, [refetchUsers, pagination.current, pagination.pageSize, search])

  const columns: ColumnProps<UserResponse>[] = useMemo(() => [
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
      sorter: true,
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      width: 100,
      render: (dob: string) => dayjs(dob).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'Contest',
      dataIndex: 'contest',
      key: 'contest',
      width: 150,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 100,
      render: (_, record: UserResponse) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Button type="primary" icon={<EditOutlined />} onClick={(e) => handleEditUser(record, e)} />
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={(e) => handleDeleteUser(record.id, e)} />
        </Space>
      ),
    },
  ], [handleEditUser, handleDeleteUser])

  return {
    users,
    isLoading,
    error,
    fetchUserById,
    columns,
    refetchUsers,
    pagination,
    search,
    handleSearch,
    handleSearchChange,
    handleTableChange,
  }
}

