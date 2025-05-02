import React, { useState, useEffect } from 'react'

import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
  Modal
} from "react-bootstrap";
import CartItems from "../../../components/CartItems";
import PayPalButton from '../../../components/PayPalButton';


const UserOrderDetailsComp = ({ user, getUser, dispatch, getOrder, orderId, updateOrder }) => {
  const [fetchedUserInfo, setFetchedUserInfo] = useState({})
  const { address, city, country, zipCode, state, phoneNumber } = fetchedUserInfo;

  const [orderDetails, setOrderDetails] = useState({
    cartItems: [], orderTotal: {}, paymentMethod: "", user: {}, isPaid: null, isDelivered: null, paidAt: null
  });
  const { cartItems, orderTotal, paymentMethod, isPaid, isDelivered, deliveredAt, paidAt } = orderDetails;
  console.log("orderDetails", orderDetails)

  const [showPayModal, setShowPayModal] = useState(false);
  const handlePayModalClose = () => setShowPayModal(false);
  const handlePayModalShow = () => setShowPayModal(true);

  useEffect(() => {
    getUser().then(res => {
      const { address, city, country, zipCode, state, phoneNumber } = res;
      if (!address || !city || !country || !zipCode || !state || !phoneNumber) {
        // setButtonDisable(true)
        // setMissing(" In order to make order, fill out your profile with correct address, city etc.")
      } else {
        setFetchedUserInfo({ address, city, country, zipCode, state, phoneNumber })
      }
      // console.log(res)
    }).catch(err => {
      console.log(err.response?.data?.message)
    })
  }, [])


  useEffect(() => {
    // console.log(orderId)
    getOrder(orderId)
      .then(data => {
        setOrderDetails(data)
      })
      .catch(err => console.log(
        err.response?.data?.message
      ))
  }, [])


  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
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
                  {isDelivered ? <>Delivered at {deliveredAt.slice(0, 10)}</> : <>Not delivered </>}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {paidAt?.slice(0, 10)}</> : <>Not Paid Yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <CartItems
                  item={item}
                  orderCreated={true}
                />
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
              Items price (after tax): <span className="fw-bold">${orderTotal.cartSubTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${orderTotal.cartSubTotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button size="lg" variant="info" onClick={handlePayModalShow} type="button" disabled={isPaid || paymentMethod !== "pp"}>
                  {!isPaid ? <>Pay for your order. (Go Cashless)</> : <>Thank You For Shopping 🎉</>}
                </Button>
              </div>
            </ListGroup.Item>

            <Modal show={showPayModal} onHide={handlePayModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Pay with PayPal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {paymentMethod === "pp" && !isPaid && (
                  <PayPalButton
                    orderTotal={orderTotal}
                    setOrderDetails={setOrderDetails}
                    handlePayModalClose={handlePayModalClose}
                    cartItems={cartItems}
                    orderId={orderId}
                    updateOrder={updateOrder}
                  />
                )}
              </Modal.Body>
            </Modal>

          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};


export default UserOrderDetailsComp