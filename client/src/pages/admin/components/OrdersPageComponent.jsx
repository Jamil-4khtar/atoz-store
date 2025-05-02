import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../../components/admin/AdminLinks";
import { useState, useEffect } from "react";

const OrdersPageComponent = ({ fetchOrders }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;
    fetchOrders(signal).then(res => setOrders(res.orders)).catch(err => console.log(
      err.response?.data?.message
    ))

    return () => {
      controller.abort()
    }
  }, [])


  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        {/* {console.log(orders)} */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{order.user ? order.user.firstName + " " + order.user.lastName : "anonymous"}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>{order.orderTotal.cartSubTotal}</td>
                  <td>
                    {
                      order.isDelivered
                        ? <i className={"bi bi-check-lg text-success"}></i>
                        : <i className={"bi bi-x-lg text-danger"}></i>
                    }
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <Link to={`/admin/order-details/${order._id}`} >go to order</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};


export default OrdersPageComponent