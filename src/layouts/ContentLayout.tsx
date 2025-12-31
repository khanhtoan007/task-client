import { Button, Flex, Layout, Typography, Tabs, Spin } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { TabsProps } from 'antd'

const { Title, Text } = Typography
const { Content } = Layout

type ContentLayoutProps = {
  title?: string
  description?: string
  functionButtons?: React.ReactNode
  backButton?: React.ReactNode
  showBackButton?: boolean
  backButtonPath?: string
  tabs?: TabsProps
  loading?: boolean
  children: React.ReactNode
}

export const ContentLayout = ({
  title,
  description,
  functionButtons,
  backButton,
  showBackButton = false,
  backButtonPath,
  tabs,
  loading = false,
  children,
}: ContentLayoutProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backButtonPath) {
      navigate(backButtonPath)
    } else {
      navigate(-1)
    }
  }

  if (loading) {
    return (
      <Layout style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      </Layout>
    )
  }

  return (
    <Layout style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '24px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        {(showBackButton || backButton) && (
          <div style={{ marginBottom: '16px' }}>
            {backButton || (
              <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        )}

        {(title || description || functionButtons) && (
          <Flex justify="space-between" align="start" gap="large">
            <Flex vertical gap="small" style={{ flex: 1 }}>
              {title && (
                <Title level={2} style={{ margin: 0 }}>
                  {title}
                </Title>
              )}
              {description && <Text type="secondary">{description}</Text>}
            </Flex>
            {functionButtons && (
              <Flex align="start" gap="small">
                {functionButtons}
              </Flex>
            )}
          </Flex>
        )}

        {tabs && <Tabs {...tabs} size="large" style={{ marginTop: '16px' }} />}
      </div>

      <Content style={{ flex: 1, padding: '24px', overflow: 'auto', minHeight: 0 }}>
        {children}
      </Content>
    </Layout>
  )
}
