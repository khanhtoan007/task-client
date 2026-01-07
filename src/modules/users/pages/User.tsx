'use client'

import { Button, Table, Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useUserController } from '../cores/user.controller'
import { useModalController } from '../cores/modal.controller'
import { CreateUserModal } from '../components/CreateUserModal'
import { ContentLayout } from '@/layouts/ContentLayout'
import type { UserRequest } from '../cores/type'

export const User = () => {
  const {
    isModalOpen,
    isEditModalOpen,
    editModalData,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    handleSubmit,
    handleEditSubmit,
  } = useModalController()
  
  const {
    isLoading,
    error,
    columns,
    users,
    refetchUsers,
    pagination,
    search,
    handleSearch,
    handleSearchChange,
    handleTableChange,
  } = useUserController({
    onEditUser: (user) => openEditModal(user),
  })

  useEffect(() => {
    refetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateUser = async (data: UserRequest) => {
    await handleSubmit(data)
    refetchUsers({ page: 1 })
  }

  const handleUpdateUser = async (data: UserRequest) => {
    if (!editModalData?.id) return
    await handleEditSubmit(data, editModalData.id)
    refetchUsers()
  }

  return (
    <>
      <ContentLayout
        title="Users"
        functionButtons={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
            Register User Contest
          </Button>
        }
      >
        {error && <div style={{ color: 'red', marginBottom: 12 }}>Error: {error}</div>}
        <Space style={{ width: '100%', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search users..."
            allowClear
            value={search}
            onSearch={handleSearch}
            onChange={handleSearchChange}
            style={{ maxWidth: 400 }}
          />
        </Space>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={pagination}
          onChange={handleTableChange}
          sortDirections={['ascend', 'descend', 'ascend']}
        />
      </ContentLayout>

      <CreateUserModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleCreateUser}
      />
      <CreateUserModal
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        handleSubmit={handleUpdateUser}
        mode="edit"
        initialValues={editModalData || undefined}
      />
    </>
  )
}

