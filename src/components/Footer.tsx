import { Typography } from 'antd'

const { Text } = Typography

/**
 * Footer Component
 *
 * Bottom footer for the dashboard.
 * Can be toggled on/off or customized based on design requirements.
 */
export const Footer = () => {
  return (
    <div className="px-6 py-4 text-center bg-gray-50 border-t border-gray-200">
      <Text type="secondary">Task management system by Toan and Minh</Text>
    </div>
  )
}
