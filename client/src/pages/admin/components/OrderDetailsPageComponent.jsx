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
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const OrderDetailsPageComponent = ({ fetchOrders, markAsDelivered }) => {
  const [details, setDetails] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isPaid, setIsPaid] = useState(false)
  const [isDelivered, setIsDelivered] = useState(false)
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [orderButtonMsg, setOrderButtonMsg] = useState("Mark as delivered")
  const [cartItems, setCartItems] = useState([])

  const { id } = useParams()
  // const id = params.id;
  console.log(id)

  useEffect(() => {
    fetchOrders(id).then(res => {
      setDetails(res);
      setUserInfo(res.user);
      setPaymentMethod(res.paymentMethod);
      res.isPaid ? setIsPaid(res.paidAt) : setIsPaid(false);
      res.isDelivered ? setIsDelivered(res.deliveredAt) : setIsDelivered(false);
      setCartSubTotal(res.orderTotal.cartSubTotal);
      if (isDelivered) {
        setOrderButtonMsg("Order is finished")
        setButtonDisabled(true)
      }
      setCartItems(res.cartItems);
    }).catch(err => console.log(
      err.response?.message?.data
    ))

    return () => {

    }
  }, [isDelivered, id])

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        {console.log(details)}
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.firstName + " " + userInfo.lastName} <br />
              <b>Address</b>: {userInfo.address} {userInfo.city} {userInfo.state} {userInfo.zipCode} <br />
              <b>Phone</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                  {isDelivered ? <>Delivered at {isDelivered}</> : <>Not Delivered</>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {isPaid}</> : <>Not Paid yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <CartItems item={item} orderCreated={true} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax): <span className="fw-bold">${cartSubTotal}</span>
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
                <Button size="lg"
                  disabled={buttonDisabled}
                  onClick={() => {
                    markAsDelivered(id)
                      .then(res => res.message === "Your order is delivered successfully" && setIsDelivered(true))
                      .catch(err => console.log(
                        err.response?.data
                      ))
                  }}
                  variant="danger"
                  type="button"
                >
                  {orderButtonMsg}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsPageComponent