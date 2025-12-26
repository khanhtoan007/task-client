import { Typography, Tabs } from 'antd'
import { useHeaderNavigate } from '@/hooks/navigates/useHeaderNavigate'
import type { HeaderTabKey } from '@/types'

const { Title, Text } = Typography

export const ProjectHeader = () => {
  const { handleTabChange, tabItems, activeTab } = useHeaderNavigate()

  return (
    <div
      style={{
        padding: '24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div className="mb-4">
        <Title level={2}>Projects</Title>
        <Text type="secondary">You currently have no project</Text>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => handleTabChange(key as unknown as HeaderTabKey)}
        items={tabItems}
        size="large"
      />
    </div>
  )
}
