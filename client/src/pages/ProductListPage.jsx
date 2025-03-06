import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function ProductListPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductListPage