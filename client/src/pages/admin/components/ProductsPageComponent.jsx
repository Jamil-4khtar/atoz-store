
import { Row, Col, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../../components/admin/AdminLinks";
import { productsList } from "../../../demoData/demo";
import { useState, useEffect } from "react";



const ProductsPageComponent = ({ fetchProducts, deleteUser }) => {
  const [products, setProducts] = useState([])
  const [productDeleted, setProductDeleted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;
    fetchProducts(signal).then((res) => setProducts(res)).catch((err) => console.log(
      err.response?.data?.message
    ))
  
    return () => {
      controller.abort();
    }
  }, [productDeleted])
  

  const deleteHandler = async (productId) => { 
    if(window.confirm("Are you sure?")){
      const data = await deleteUser(productId)
      // console.log(data)
      if (data.message === "Deleted the product successfully") {
        setProductDeleted(!productDeleted)
      }
    }
  }
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>
          Product List {" "} {console.log(products)}
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
            {products.map(
              (product, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button className="btn-sm m-1" as={Link} to={`/admin/edit-product/${product._id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product._id)}>
                      <i className="bi bi-x-circle"></i>
                    </Button>
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



export default ProductsPageComponent