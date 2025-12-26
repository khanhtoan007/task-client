import { Summary } from '@/modules/task/pages/Summary'
import { Timeline } from '@/modules/task/pages/Timeline'
import { Board } from '@/modules/task/pages/Board'
import { Routes, Route } from 'react-router-dom'

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/** Task routes */}
      <Route path="summary" element={<Summary />} />
      <Route path="timeline" element={<Timeline />} />
      <Route path="board" element={<Board />} />

      {/** Auth routes */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  )
}
