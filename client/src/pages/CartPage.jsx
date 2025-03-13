import React from 'react'
import { Container, Row, Col, ListGroup, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartItems from '../components/CartItems'

function CartPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Shopping Cart</h1>
          <ListGroup variant='flush'>
            {
              Array.from({ length: 3 }).map((_, i) => (
                <ListGroup.Item key={i}>
                  <CartItems />
                </ListGroup.Item>
              ))
            }
          </ListGroup>
          <Alert variant='info'>
            Your Cart is empty
          </Alert>
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal (2 items)</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: <span>$345</span></ListGroup.Item>
            <ListGroup.Item>
              <Link to="/user/cart-details">
                <Button type='button'>Proceed to checkout</Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage