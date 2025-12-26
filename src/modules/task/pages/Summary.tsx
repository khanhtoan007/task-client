import { Card, Flex, Typography, Row, Col } from 'antd'

export const Summary = () => {
  return (
    <Flex vertical gap="large">
      <Card>
        <Typography.Title level={2}>Summary</Typography.Title>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Typography.Title level={4}>Chart 1</Typography.Title>
            <div style={{ height: 200 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Typography.Title level={4}>Chart 2</Typography.Title>
            <div style={{ height: 200 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Typography.Title level={4}>Chart 3</Typography.Title>
            <div style={{ height: 200 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Card>
            <Typography.Title level={4}>Chart 4</Typography.Title>
            <div style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Card>
            <Typography.Title level={4}>Chart 5</Typography.Title>
            <div style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
    </Flex>
  )
}
