import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'

export const useHeaderNavigate = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const basePath = id ? `/projects/${id}` : ''

  const tabItems = useMemo(
    () => [
      {
        key: `${basePath}/summary`,
        label: 'Summary',
      },
      {
        key: `${basePath}/timeline`,
        label: 'Timeline',
      },
      {
        key: `${basePath}/board`,
        label: 'Board',
      },
    ],
    [basePath]
  )

  const activeTabValue = useMemo((): string => {
    const path = location.pathname
    if (path.includes('/summary')) {
      return `${basePath}/summary`
    } else if (path.includes('/timeline')) {
      return `${basePath}/timeline`
    } else if (path.includes('/board')) {
      return `${basePath}/board`
    }
    return `${basePath}/summary`
  }, [location.pathname, basePath])

  const [activeTab, setActiveTab] = useState<string>(activeTabValue)

  useEffect(() => {
    setActiveTab(activeTabValue)
  }, [activeTabValue])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    navigate(key)
  }

  return {
    handleTabChange,
    tabItems,
    activeTab,
  }
}
