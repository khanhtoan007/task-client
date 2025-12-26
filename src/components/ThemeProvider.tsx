import { ConfigProvider, theme } from 'antd'
import type { ReactNode } from 'react'
import { themeConfig } from '@/styles/theme'

interface ThemeProviderProps {
  children: ReactNode
  isDark?: boolean
}

export const ThemeProvider = ({ children, isDark = false }: ThemeProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}
