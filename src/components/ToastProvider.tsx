import { useThemeStore } from "@/hooks/useThemeStore"
import { Toaster } from "react-hot-toast"

export const ToastProvider = () => {
    const { isDark } = useThemeStore()
  
    return (
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? '#1f1f1f' : '#fff',
            color: isDark ? '#fff' : '#000',
            border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
          },
          success: {
            duration: 3000,
            style: {
              background: isDark ? '#1f1f1f' : '#fff',
              color: isDark ? '#fff' : '#000',
              border: isDark ? '1px solid #22c55e' : '1px solid #4ade80',
            },
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: isDark ? '#1f1f1f' : '#fff',
              color: isDark ? '#fff' : '#000',
              border: isDark ? '1px solid #dc2626' : '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    )
  }