import type { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Border radius
    borderRadius: 6,

    // Font
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSize: 14,
    lineHeight: 1.5715,

    // Spacing
    padding: 16,
    margin: 16,

    // Box shadow
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    boxShadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.09)',

    // Layout
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 6,
      fontWeight: 500,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 8,
      paddingLG: 24,
    },
    Form: {
      labelFontSize: 14,
      verticalLabelPadding: '0 0 8px',
    },
    Menu: {
      borderRadius: 6,
    },
  },
  algorithm: undefined, // Will be set based on theme mode (light/dark)
}

export const lightTheme: ThemeConfig = {
  ...themeConfig,
  algorithm: undefined, // Default algorithm is light
}

export const darkTheme: ThemeConfig = {
  ...themeConfig,
  token: {
    ...themeConfig.token,
    colorBgBase: '#141414',
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorBorder: '#434343',
    colorBorderSecondary: '#303030',
  },
  algorithm: undefined,
}
