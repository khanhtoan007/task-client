import { Button } from 'antd'
import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useHeaderNavigate } from '@/hooks/navigates/useHeaderNavigate'
import { useProjectController } from '@/modules/project/cores/project.controller'
import type { ProjectResponse } from '@/modules/project/cores/type'
import { EditOutlined, UserAddOutlined } from '@ant-design/icons'
import { ContentLayout } from '@/layouts/ContentLayout'

export const PrivateLayout = () => {
  const { id } = useParams<{ id: string }>()
  const { handleTabChange, tabItems, activeTab } = useHeaderNavigate()
  const { fetchProjectById } = useProjectController()
  const [project, setProject] = useState<ProjectResponse | null>(null)
  const [loading, setLoading] = useState(true)

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
  }, [id, fetchProjectById])

  return (
    <ContentLayout
      title={project?.name || 'Projects'}
      description={project?.description || 'You currently have no project'}
      showBackButton
      backButtonPath="/projects"
      functionButtons={
        <>
          <Button type="primary" icon={<UserAddOutlined />}>
            Assign Member
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </>
      }
      tabs={{
        activeKey: activeTab,
        onChange: handleTabChange,
        items: tabItems,
      }}
      loading={loading}
    >
      <Outlet />
    </ContentLayout>
  )
}
