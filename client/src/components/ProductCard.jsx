import React from 'react'
import { Card, Button, Row, Col, Image, Badge } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Card className="product-card" style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row className="g-0">
        <Col lg={5} className="position-relative">
          <Image
            fluid
            crossOrigin='anonymous'
            style={{
              minHeight: "250px",
              aspectRatio: "3 / 2",
              objectFit: "cover",
              borderRadius: "var(--border-radius) 0 0 var(--border-radius)"
            }}
            src={product.images[0].path}
            className="h-100"
          />
          {product.stock <= 0 && (
            <Badge bg="danger" className="position-absolute top-0 end-0 m-2">Out of Stock</Badge>
          )}
        </Col>
        <Col lg={7}>
          <Card.Body className="d-flex flex-column h-100">
            <Card.Title className="fs-4 mb-3 text-white">{product.name}</Card.Title>
            <Card.Text className="text-secondary mb-3">
              {product.description}
            </Card.Text>
            <Card.Text className='d-flex flex-row align-items-center mb-3'>
              <Rating readonly size={20} initialValue={parseInt(product.rating)} />
              <span className="ms-2 text-muted">({product.reviewsNumber} reviews)</span>
            </Card.Text>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <span className="h4 mb-0">${product.price}</span>
              <Link to={`/product-details/${product._id}`}>
                <Button variant="primary">See Product</Button>
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductCard