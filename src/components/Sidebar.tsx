import { Menu, Avatar, Button, Flex, Divider, Space, theme, Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { ProjectOutlined, UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useSidebarStore } from './cores/sidebar-store'
import { useAuthStore } from '@/hooks/useAuthStore'
import { logout as logoutService } from '@/modules/auth/services/auth.service'
import { useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'

const { Text } = Typography

type MenuItem = Required<MenuProps>['items'][number]

export const Sidebar = () => {
  const { token } = theme.useToken()
  const { isDark } = useThemeStore()
  const { userProfile } = useSidebarStore()
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState<string>('projects')

  const menuItems: MenuItem[] = [
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: 'Projects',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
  }

  const handleLogout = async () => {
    try {
      await logoutService()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
      navigate('/login')
    }
  }

  const profileMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => {
        // TODO: Navigate to profile page or show profile modal
        console.log('View profile')
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ]

  const sidebarStyle: CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  const profileSectionStyle: CSSProperties = {
    padding: token.padding,
    backgroundColor: token.colorBgContainer,
  }

  return (
    <Flex vertical style={sidebarStyle}>
      <Flex style={profileSectionStyle}>
        <Dropdown
          menu={{ items: profileMenuItems }}
          placement="topLeft"
          trigger={['click']}
          dropdownRender={(menu) => (
            <div
              style={{
                minWidth: 200,
                backgroundColor: token.colorBgContainer,
                borderRadius: token.borderRadius,
              }}
            >
              {userProfile && (
                <div
                  style={{
                    padding: token.paddingSM,
                    borderBottom: `1px solid ${token.colorBorder}`,
                  }}
                >
                  <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    <Text strong>{userProfile.email}</Text>
                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                      {userProfile.email}
                    </Text>
                  </Space>
                </div>
              )}
              {menu}
            </div>
          )}
        >
          <Button
            type="text"
            block
            style={{
              height: 'auto',
              padding: token.paddingSM,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Space size={token.sizeSM}>
              <Avatar src={userProfile?.avatar} icon={<UserOutlined />} size="small" />
              <span>{userProfile?.name || 'Profile'}</span>
            </Space>
          </Button>
        </Dropdown>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <Menu
        theme={isDark ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          paddingTop: 10,
          flex: 1,
          borderRight: 0,
        }}
      />
    </Flex>
  )
}
