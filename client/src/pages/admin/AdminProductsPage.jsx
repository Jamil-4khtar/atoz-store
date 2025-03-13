import { Row, Col, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../components/admin/AdminLinks";
import { productsList } from "../../demoData/demo";

const deleteHandler = () => { 
  if(window.confirm("Are you sure?")) alert("Product deleted")
}

const AdminProductsPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>
          Product List {" "}
          <Button as={Link} to={"/admin/create-product"} variant="primary" size="sm" >
            Create New Product
          </Button>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(
              (item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <Button className="btn-sm m-1" as={Link} to={"/admin/edit-product"}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="btn-sm" variant="danger" onClick={deleteHandler}>
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                  <td>Paypal</td>

                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};





export default AdminProductsPage