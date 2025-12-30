import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PrivateLayout } from '@/components/PrivateLayout'
import { PrivateRoutes } from './PrivateRoutes'
import { LoginPage } from '@/modules/auth/pages/Login'
import { RegisterPage } from '@/modules/auth/pages/Register'
import { Project } from '@/modules/project/pages/Project'
import { Summary } from '@/modules/task/pages/Summary'
import { Timeline } from '@/modules/task/pages/Timeline'
import { Board } from '@/modules/task/pages/Board'

import App from '../App'

export const AppRoutes = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<App />}>
            <Route path="projects" element={<Project />} />
            <Route path="projects/:id" element={<PrivateLayout />}>
              <Route index element={<Navigate to="summary" replace />} />
              <Route path="summary" element={<Summary />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="board" element={<Board />} />
            </Route>
            <Route element={<PrivateLayout />}>
              <Route path="*" element={<PrivateRoutes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
