'use client'

import { Button, Table, Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useProjectController } from '../cores/project.controller'
import { useModalController } from '../cores/modal.controller'
import { CreateProjectModal } from '../components/CreateProjectModal'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'
import { ContentLayout } from '@/layouts/ContentLayout'
import type { ProjectRequest } from '../cores/type'

export const Project = () => {
  const navigate = useNavigate()
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
    projects,
    refetchProjects,
    pagination,
    search,
    handleSearch,
    handleSearchChange,
    handleTableChange,
    isConfirmModalOpen,
    closeConfirmModal,
    handleDeleteProject,
  } = useProjectController({
    onEditProject: (project) => openEditModal(project),
  })

  useEffect(() => {
    refetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateProject = async (data: ProjectRequest) => {
    await handleSubmit(data)
    refetchProjects({ page: 1 })
  }

  const handleUpdateProject = async (data: ProjectRequest) => {
    if (!editModalData?.id) return
    await handleEditSubmit(data, editModalData.id)
    // Giữ nguyên pagination và search sau khi update
    refetchProjects()
  }

  return (
    <>
      <ContentLayout
        title="Projects"
        functionButtons={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal(null)}>
            Add Project
          </Button>
        }
      >
        {error && <div style={{ color: 'red', marginBottom: 12 }}>Error: {error}</div>}
        <Space style={{ width: '100%', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search projects..."
            allowClear
            value={search}
            onSearch={handleSearch}
            onChange={handleSearchChange}
            style={{ maxWidth: 400 }}
          />
        </Space>
        <Table
          dataSource={projects}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={pagination}
          onChange={handleTableChange}
          sortDirections={['ascend', 'descend', 'ascend']}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/projects/${record.id}`)
            },
            style: { cursor: 'pointer' },
          })}
        />
      </ContentLayout>

      <CreateProjectModal
        isModalOpen={isModalOpen || isEditModalOpen}
        closeModal={isEditModalOpen ? closeEditModal : closeModal}
        handleSubmit={isEditModalOpen ? handleUpdateProject : handleCreateProject}
        mode={isEditModalOpen ? 'edit' : 'create'}
        initialValues={isEditModalOpen ? editModalData || undefined : undefined}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDeleteProject}
        title="Confirm Delete"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </>
  )
}
