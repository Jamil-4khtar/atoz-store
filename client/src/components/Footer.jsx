import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="bg-body-tertiary text-center py-3">Copyright &copy; Best Online Shop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer