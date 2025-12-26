import { useNavigate } from 'react-router-dom'
import type { HeaderTabKey } from '@/types'
import { useState } from 'react'

export const useHeaderNavigate = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<HeaderTabKey>('summary')
  const tabItems = [
    {
      key: '/summary',
      label: 'Summary',
    },
    {
      key: '/timeline',
      label: 'Timeline',
    },
    {
      key: '/board',
      label: 'Board',
    },
  ]

  const handleTabChange = (key: HeaderTabKey) => {
    setActiveTab(key)
    navigate(key)
  }

  return {
    handleTabChange,
    tabItems,
    activeTab,
  }
}
