import { Outlet } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader'

export const PrivateLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <ProjectHeader />
      <div style={{ flex: 1, padding: '24px', overflow: 'auto', minHeight: 0 }}>
        <Outlet />
      </div>
    </div>
  )
}
