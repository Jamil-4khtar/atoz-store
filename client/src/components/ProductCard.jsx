import React from 'react'
import { Card, Button, Row, Col, Image } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import {Link} from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Image fluid crossOrigin='anonymous'  style={{ minHeight: "250px", aspectRatio: "3 / 2", objectFit: "cover" }} src={"/images/product.png" || product.images[0]}  thumbnail/>
        </Col>
        <Col lg={7}>
          <Card.Body >
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Card.Text className='d-flex flex-row align-items-center'>
              <Rating readonly size={20} initialValue={parseInt(product.rating)} /><span>({product.reviewsNumber})</span>
            </Card.Text>
            <Card.Text className='h4'>
              ${product.price} {" "}
              <Link to={`/product-details/${product._id}`}>
                <Button variant="danger">See Product</Button>
              </Link>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductCard