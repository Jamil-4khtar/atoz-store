import React from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import RemoveFromCartComp from './RemoveFromCartComp'

function CartItems({ item, orderCreated = false, changeQty = false, removeFromCartHandler}) {
  return (
    <Row>
      <Col md={2}>
        <Image crossOrigin='anonymous' src={item.images[0]?.path} fluid />
      </Col>
      <Col md={2}>
        {item.name}
      </Col>
      <Col md={2}>${item.price}</Col>
      <Col md={3}>
        <Form.Select onChange={changeQty ? (e) => changeQty(item._id, e.target.value) : undefined} disabled={orderCreated} value={item.qty}>
          {Array(item.count).fill().map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={3}>
        <RemoveFromCartComp
          id={item._id}
          orderCreated={orderCreated}
          qty={item.qty}
          price={item.price}
          removeFromCartHandler={removeFromCartHandler}
        />

      </Col>
    </Row>
  )
}

export default CartItems