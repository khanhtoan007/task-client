import { Typography, Tabs, Spin, Flex, Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useHeaderNavigate } from '@/hooks/navigates/useHeaderNavigate'
import { useProjectController } from '@/modules/project/cores/project.controller'
import type { ProjectResponse } from '@/modules/project/cores/type'
import { ArrowLeftOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export const ProjectHeader = () => {
  const { id } = useParams<{ id: string }>()
  const { handleTabChange, tabItems, activeTab } = useHeaderNavigate()
  const { fetchProjectById } = useProjectController()
  const [project, setProject] = useState<ProjectResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetchProjectById(id)
        if (response.success) {
          setProject(response.data)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div
        style={{
          padding: '24px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px',
        }}
      >
        <Spin />
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Back button */}
      <Button
        style={{ alignSelf: 'flex-start' }}
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/projects')}
      >
        Back
      </Button>
      {/* Header */}
      <Flex justify="space-between" gap="large">
        <Flex justify="space-between" vertical gap="small">
          <Title level={2}>{project?.name || 'Projects'}</Title>
          <Text type="secondary">{project?.description || 'You currently have no project'}</Text>
        </Flex>
        <Flex align="start" gap="small">
          <Button type="primary" icon={<UserAddOutlined />}>
            Assign Member
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </Flex>
      </Flex>

      <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} size="large" />
    </div>
  )
}
