import React, { useEffect } from 'react'
import { Row, Col, Container, Image, ListGroup, Form, Button, Alert, ListGroupItem } from 'react-bootstrap'
import AddedToCartMessage from '../components/AddedToCartMessage';
import { Rating } from 'react-simple-star-rating'
import ImageZoom from 'js-image-zoom'

function ProductDetailsPage() {
  var options = {
    scale: 2,
    // width: 400,
    // zoomWidth: 500,
    offset: { vertical: 0, horizontal: 10 }
  };
  
  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options)
    new ImageZoom(document.getElementById("second"), options)
    new ImageZoom(document.getElementById("third"), options)
  })



  return (
    <Container fluid>
      <AddedToCartMessage />
      <Row className='mt-4'>
        <Col md={4} style={{ zIndex: 10 }}>
          <div id='first'>
            <Image crossOrigin='anonymous' fluid src='/images/carousel/clothing.jpeg' />
          </div>
          <br />
          <div id='second'>
            <Image crossOrigin='anonymous' fluid src='/images/carousel/electronic.jpeg' />
          </div>
          <br />
          <div id='third'>
            <Image crossOrigin='anonymous' fluid src='/images/carousel/household.jpeg' />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item className='fw-semibold border-0'><h5>Product Name</h5></ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Rating readonly size={20} initialValue={4} />
                </ListGroup.Item>
                <ListGroup.Item className="border-0">price: <span className='fw-semibold'>$300</span></ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error esse velit aut vero adipisci consequuntur sint, maiores repudiandae illo porro pariatur dolore sunt voluptatibus unde eveniet veniam nemo neque amet harum incidunt corrupti animi eum ipsa! Explicabo quaerat iure, praesentium eius corporis laborum doloribus molestiae voluptatum qui harum veritatis officia!</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item className="border-0">In stock</ListGroup.Item>
                <ListGroup.Item className="border-0">Price: <span className='fw-semibold'>$300</span></ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <p>Quantity:</p>
                  <Form.Select size='sm' aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Button variant='danger'>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className='mt-5'>
              {/* <h5>REVIEWS</h5> */}
              <ListGroup>
                <ListGroupItem className='fw-bold'>REVIEWS</ListGroupItem>
                {
                  Array.from({ length: 5 }).map((_, i) => (
                    <ListGroup.Item key={i}>
                      <p className='fw-semibold m-0 p-0'>Sohail Akhtar</p>
                      <Rating readonly size={20} initialValue={i + 1} />
                      <p>31-01-2006</p>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nemo labore ad cum iusto, reiciendis placeat eveniet tempora porro odio! Facere voluptates porro eligendi quas molestias, ducimus laudantium aliquid culpa corrupti dicta vitae placeat consequatur blanditiis aspernatur reiciendis et pariatur atque itaque ratione adipisci! Similique autem incidunt maxime placeat cum.</p>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant='warning'>You must be logged in to write a review.</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Your rating</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            <Button variant='primary' className='mt-2 mb-2'>Submit</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  )
}

export default ProductDetailsPage