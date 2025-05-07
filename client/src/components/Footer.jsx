import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer>
      <Container fluid className="mt-5">
        <Row>
          <Col className="bg-primary text-white text-center py-3">
            <div className="d-flex flex-column align-items-center justify-content-center">
              {/* <h5 className="mb-3">A/Z Store</h5> */}
              {/* <p className="mb-1">Your one-stop shop for quality products</p> */}
              <p className="mb-0">&copy; {new Date().getFullYear()} Best Online Shop. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer