import React from 'react'
import { Container, Row, Col, ListGroup, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartItems from '../../components/CartItems'


function CartPageComp({ totalItems, cartItems, cartSubTotal, dispatch, setQuantity, removeFromCart }) {
  console.log(cartItems)

  const changeQty = (id, qty) => {
    console.log(id, qty)
    dispatch(setQuantity({ id , qty}))
  }
  const removeFromCartHandler = (id, qty, price) => {
    // console.log(id, price, qty)
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromCart({ id, qty, price }))
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Shopping Cart</h1>
          <ListGroup variant='flush'>
            {
              cartItems.map(item => (
                <ListGroup.Item key={item._id}>
                  <CartItems
                    item={item}
                    changeQty={changeQty}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                </ListGroup.Item>
              ))
            }
          </ListGroup>
          {
            !cartItems.length > 0 &&
            <Alert variant='info'>
              Your Cart is empty
            </Alert>
          }
        </Col>
        {cartItems.length > 0 && <Col>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal ({totalItems} items)</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: <span>${cartSubTotal}</span></ListGroup.Item>
            <ListGroup.Item>
              <Link to="/user/cart-details">
                <Button type='button'>Proceed to checkout</Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>}
      </Row>
    </Container>
  )
}

export default CartPageComp