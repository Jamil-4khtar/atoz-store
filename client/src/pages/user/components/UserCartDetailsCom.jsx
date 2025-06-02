import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItems from "../../../components/CartItems";
import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


function UserCartDetailsCom({ totalItems, cartItems, cartSubTotal, dispatch, setQuantity, removeFromCart, getUser, user, createOrder   }) {
  const navigate = useNavigate()
  const [buttonDisable, setButtonDisable] = useState(false)
  const [fetchedUserInfo, setFetchedUserInfo] = useState({})
  const [missing, setMissing] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("pp")

  const {address, city, country, zipCode, state, phoneNumber} = fetchedUserInfo;

  const changeQty = (id, qty) => {
    console.log(id, qty)
    dispatch(setQuantity({ id, qty }))
  }
  const removeFromCartHandler = (id, qty, price) => {
    // console.log(id, price, qty)
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromCart({ id, qty, price }))
    }
  }

  const orderHandler = () => {
      const orderData = {
        orderTotal: {
          itemsCount: totalItems,
          cartSubTotal: cartSubTotal
        },
        cartItems: cartItems.map(product => (
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: { path: product.images[0].path},
            quantity: product.qty,
            count: product.count
          }
        )),
        paymentMethod,

      };
      console.log(orderData)

      createOrder(orderData)
      .then(res => {
        if (res) {
          console.log(res)
          navigate("/user/order-details/"+res._id)
        }
      })
      .catch(err => console.log(
        err.response?.data?.message
      ))
    }

  useEffect(() => {
    getUser().then(res => {
      const {address, city, country, zipCode, state, phoneNumber} = res;
      if (!address || !city || !country || !zipCode || !state || !phoneNumber) {
        setButtonDisable(true)
        setMissing(" In order to make order, fill out your profile with correct address, city etc.")
      } else {
        setFetchedUserInfo({address, city, country, zipCode, state, phoneNumber})
      }
      // console.log(res)
    }).catch(err => {
      console.log(err.response?.data?.message)
    })

    return () => {

    }
  }, [user._id])


  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {user.firstName + " " + user.lastName} <br />
              <b>Address</b>: {address && city && state && country && zipCode && `${address}, ${city}, ${state}, ${country}, ${zipCode}` || "Must need an address"}<br />
              <b>Phone</b>: {phoneNumber || "Must required Phone number"}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select onChange={e => setPaymentMethod(e.target.value)} >
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not delivered. 
                  { missing + " "}
                  { missing && <span><Link to="/user">Click here update your profile</Link></span>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Not Paid Yet.
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup >
            {cartItems.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <CartItems
                  item={item}
                  changeQty={changeQty}
                  removeFromCartHandler={removeFromCartHandler}

                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
              {totalItems} items in cart
            </ListGroup.Item>
            <ListGroup.Item>
              Total price (after tax): <span className="fw-bold">${cartSubTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" onClick={orderHandler} disabled={buttonDisable} type="button">
                  Place Your Order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserCartDetailsCom