import { Input, Avatar, Typography, Space, Flex, Layout, Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import { useThemeStore } from '@/hooks/useThemeStore'
import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const { Header: LayoutHeader } = Layout
const { Search } = Input
const { useToken } = theme

export const Header = () => {
  const { token } = useToken()
  const { isDark, toggleTheme } = useThemeStore()
  const navigate = useNavigate()
  const handleSearch = (value: string) => {
    console.log('Search:', value)
  }

  const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    backgroundColor: token.colorBgContainer,
    borderBottom: `1px solid ${token.colorBorder}`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  }

  return (
    <LayoutHeader style={headerStyle}>
      <Flex align="center" gap={16}>
        <Space size={8} style={{ cursor: 'pointer' }} onClick={() => navigate('/projects')}>
          <div
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              backgroundColor: '#1890ff',
              color: '#fff',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 20, height: 20 }}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <Title level={5} style={{ margin: 0, color: token.colorText }}>
            TaskFlow
          </Title>
        </Space>
      </Flex>

      <Flex flex={1} justify="center" style={{ maxWidth: 640, padding: '0 32px' }}>
        <Search
          placeholder="Search tasks, projects..."
          onSearch={handleSearch}
          style={{ maxWidth: 400, width: '100%' }}
          allowClear
        />
      </Flex>

      <Space size={12}>
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </Space>
    </LayoutHeader>
  )
}
