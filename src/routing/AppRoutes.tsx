import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PrivateLayout } from '@/components/PrivateLayout'
import { PrivateRoutes } from './PrivateRoutes'
import { LoginPage } from '@/modules/auth/pages/Login'
import { RegisterPage } from '@/modules/auth/pages/Register'
import App from '../App'

export const AppRoutes = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<App />}>
            <Route element={<PrivateLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<PrivateRoutes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
