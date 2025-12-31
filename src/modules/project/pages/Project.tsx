'use client'

import { Button, Flex, Table, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useProjectController } from '../cores/project.controller'
import { useModalController } from '../cores/modal.controller'
import { CreateProjectModal } from '../components/CreateProjectModal'
import { ContentLayout } from '@/layouts/ContentLayout'
import type { ProjectRequest } from '../cores/type'

export const Project = () => {
  const { isLoading, error, columns, projects, refetchProjects } = useProjectController()
  const navigate = useNavigate()
  const { isModalOpen, openModal, closeModal, handleSubmit } = useModalController()

  const handleCreateProject = async (data: ProjectRequest) => {
    await handleSubmit(data)
    refetchProjects()
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
        <Spin size="large" />
      </Flex>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
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
        <Table
          dataSource={projects}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              navigate(`/projects/${record.id}`)
            },
            style: { cursor: 'pointer' },
          })}
        />
      </ContentLayout>

      <CreateProjectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleCreateProject}
      />
    </>
  )
}
