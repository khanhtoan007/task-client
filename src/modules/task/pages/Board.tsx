import { Card, Flex, Typography, Row, Col, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { TaskStatus, type TaskResponse } from '../cores/type'
import { boardController } from '../cores/board.controller'

export const Board = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [groupedTasks, setGroupedTasks] = useState(boardController.groupTasksByStatus([]))

  const statuses = [
    { key: TaskStatus.PENDING, label: 'Pending' },
    { key: TaskStatus.PROCESSING, label: 'Processing' },
    { key: TaskStatus.COMPLETED, label: 'Completed' },
    { key: TaskStatus.CANCELLED, label: 'Cancelled' },
  ]

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const fetchedTasks = await boardController.fetchTasks()
        setTasks(fetchedTasks)
        setGroupedTasks(boardController.groupTasksByStatus(fetchedTasks))
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
        <Spin size="large" />
      </Flex>
    )
  }

  return (
    <Flex vertical gap="large">
      <Card>
        <Typography.Title level={2}>Board</Typography.Title>
      </Card>

      <Row gutter={[16, 16]}>
        {statuses.map((status) => {
          const tasksForStatus = groupedTasks[status.key] || []
          const count = boardController.getTaskCountByStatus(tasks, status.key)

          return (
            <Col xs={24} sm={12} lg={6} key={status.key}>
              <Card
                title={
                  <Space>
                    <Typography.Text strong>{status.label}</Typography.Text>
                    <Typography.Text type="secondary">({count})</Typography.Text>
                  </Space>
                }
                style={{ height: '100%' }}
              >
                <Flex vertical gap="small">
                  {tasksForStatus.length === 0 ? (
                    <Typography.Text
                      type="secondary"
                      style={{ textAlign: 'center', padding: '20px' }}
                    >
                      No tasks
                    </Typography.Text>
                  ) : (
                    tasksForStatus.map((task) => (
                      <Card
                        key={task.id}
                        size="small"
                        style={{ marginBottom: '8px', cursor: 'pointer' }}
                        hoverable
                      >
                        <Flex vertical gap="small">
                          <Typography.Text strong>{task.title}</Typography.Text>
                          {task.description && (
                            <Typography.Text type="secondary" ellipsis>
                              {task.description}
                            </Typography.Text>
                          )}
                        </Flex>
                      </Card>
                    ))
                  )}
                </Flex>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Flex>
  )
}
