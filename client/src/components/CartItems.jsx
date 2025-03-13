import React from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'

function CartItems() {
  return (
    <Row>
      <Col md={2}>
        <Image crossOrigin='anonymous' src='/images/carousel/clothing.jpeg' fluid/>
      </Col>
      <Col md={2}>
        Product 1
      </Col>
      <Col md={2}>$234</Col>
      <Col md={3}>
        <Form.Select>
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Button variant='secondary' type='button' onClick={() => window.confirm("Are you sure?")}><i className="bi bi-trash"></i></Button>
      
      </Col>
    </Row>
  )
}

export default CartItems