import React from 'react'
import { Card, Button, Row, Col, Image } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import {Link} from 'react-router-dom'

function ProductCard() {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Image fluid  style={{ minHeight: "250px", aspectRatio: "3 / 2", objectFit: "cover" }} src="/images/product.png"  thumbnail/>
        </Col>
        <Col lg={7}>
          <Card.Body >
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text className='d-flex flex-row align-items-center'>
              <Rating readonly size={20} initialValue={5} /><span>(10)</span>
            </Card.Text>
            <Card.Text className='h4'>
              $2700 {" "}
              <Link to="/product-details">
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