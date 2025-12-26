import { Layout, ConfigProvider, theme as antdTheme } from 'antd'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { useThemeStore } from '@/hooks/useThemeStore'
import { themeConfig } from '@/styles/theme'

const { Content, Sider } = Layout

export const AppLayout = () => {
  const { isDark } = useThemeStore()

  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <Layout style={{ height: '100vh' }}>
        <Layout.Header style={{ padding: 0 }}>
          <Header />
        </Layout.Header>

        <Layout style={{ height: 'calc(100vh - 64px)' }}>
          <Sider
            width={250}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <Sidebar />
          </Sider>

          <Layout className="bg-gray-50">
            <Content style={{ height: '100%', overflow: 'auto' }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
