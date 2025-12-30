'use client'

import { Button, Flex, Table, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useProjectController } from '../cores/project.controller'
import { Content } from 'antd/es/layout/layout'
import { useModalController } from '../cores/modal.controller'
import { CreateProjectModal } from '../components/CreateProjectModal'
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
      <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Flex justify="space-between" align="center">
          <Title level={2}>Projects</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal(null)}>
            Add Project
          </Button>
        </Flex>

        <Flex vertical gap="large">
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
        </Flex>
      </Content>

      <CreateProjectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleCreateProject}
      />
    </>
  )
}
