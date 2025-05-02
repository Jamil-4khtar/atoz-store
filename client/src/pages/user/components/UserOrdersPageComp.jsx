import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";



const UserOrdersPageComp = ({ getOrders }) => {
  const [orders, setOrders] = useState([])
  console.log(orders)

  useEffect(() => {
    getOrders()
    .then(res => setOrders(res))
    .catch(err => console.log(err.response?.data?.message))
  }, [])

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 && orders.map(
              (order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>You</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>${order.orderTotal.cartSubTotal}</td>
                  <td>
                    <i className={order.isDelivered ? "bi bi-check-lg text-success" : "bi bi-x-lg text-danger"}></i>
                  </td>
                  <td>
                    <Link to={`/user/order-details/${order._id}`}>go to order</Link>
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

// ["bi bi-check-lg text-success", "bi bi-x-lg text-danger"]

export default UserOrdersPageComp