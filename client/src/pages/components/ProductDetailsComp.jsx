import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Image, ListGroup, Form, Button, Alert, ListGroupItem } from 'react-bootstrap'
import AddedToCartMessage from '../../components/AddedToCartMessage'
import { Rating } from 'react-simple-star-rating'
import ImageZoom from 'js-image-zoom'
import ScrollToTop from '../../utils/scrollToTop';
import { useParams } from 'react-router-dom';
import { fetchAndAddToCart } from '../../utils/cartUtils'
import MetaComponent from '../../components/MetaComponent'

var options = {
  scale: 2,
  // width: 400,
  // zoomWidth: 500,
  offset: { vertical: 0, horizontal: 10 }
};

function ProductDetailsComp({ dispatch, getProductDetails, user, writeReviewApi }) {
  const [showAddToCartMsg, setShowAddToCartMsg] = useState(false)
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [qty, setQty] = useState(1)
  const { id } = useParams();
  const [productReviewed, setProductReviewed] = useState(false)

  const handleAddToCart = () => {
    dispatch(fetchAndAddToCart(id, qty))
    setShowAddToCartMsg(true)
    setTimeout(() => {
      setShowAddToCartMsg(false)
    }, 5000);
  }

  ScrollToTop()

  useEffect(() => {
    product.images?.forEach((_, idx) => {
      new ImageZoom(document.getElementById(`image${idx + 1}`), options)
    })
  })

  useEffect(() => {
    getProductDetails(id)
      .then(data => {
        setProduct(data)
        console.log(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response?.data?.message)
      })
  }, [id, productReviewed])


  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements;

    const formInputs = {
      comment: elements.comment.value,
      rating: elements.rating.value
    }

    if (form.checkValidity() === true) {
      // console.log(product._id, formInputs)
      writeReviewApi(product._id, formInputs)
        .then(res => {
          if (res.product) {
            // console.log(res) 
            setProductReviewed("You successfully reviewed the product")
            elements.comment.value = "";
            elements.rating.value = "";
          }
        })
        .catch(err => console.log(
          err.response?.data?.error
        ))
    }
  }

  return (
    <>
      <MetaComponent
        title={`${product.name} | A-Z Store`}
        description={product.description}
        image={product.image}
        url={`https://yourdomain.com/product/${product._id}`}
      />
      <Container fluid>
        {showAddToCartMsg && <AddedToCartMessage />}
        <Row className='mt-4'>
          <Col md={4} style={{ zIndex: 10 }}>
            {
              product.images.length > 0 && product.images.map((image, idx) => (
                <div key={idx}>
                  <div id={`image${idx + 1}`}>
                    <Image crossOrigin='anonymous' fluid src={image.path} />
                  </div>
                  <br />
                </div>
              ))
            }
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup>
                  <ListGroup.Item className='fw-semibold border-0'><h5>{product.name}</h5></ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <Rating readonly size={20} initialValue={Math.floor(product.rating)} />
                    ({product.reviewsNumber})
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0">price: <span className='fw-semibold'>${product.price}</span></ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item className="border-0">{product.count > 0 ? "In stock" : "Out of stock"}</ListGroup.Item>
                  <ListGroup.Item className="border-0">Price: <span className='fw-semibold'>${product.price}</span></ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <p>Quantity:</p>
                    <Form.Select size='sm' value={qty} onChange={(e) => setQty(e.target.value)} aria-label="choose quantity">
                      <option>Choose</option>
                      {
                        Array.from({ length: product.count }, (_, i) => i + 1).map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))
                      }
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <Button variant='danger' onClick={handleAddToCart}>Add to Cart</Button>
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

                    product.reviews.length > 0 && product.reviews.map((r, idx) => (
                      <ListGroup.Item key={idx}>
                        <p className='fw-semibold m-0 p-0'>{r.user.name}</p>
                        <Rating readonly size={20} initialValue={r.rating} />
                        <p>{r.createdAt.slice(0, 10)}</p>
                        <p>{r.comment}</p>
                      </ListGroup.Item>
                    ))
                  }
                </ListGroup>
              </Col>
            </Row>
            <hr />
            {!user?.email && <Alert variant='warning'>You must be logged in to write a review.</Alert>}
            <Form onSubmit={sendReviewHandler}>
              <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Write a review</Form.Label>
                <Form.Control disabled={!user?.email} as="textarea" rows={3} />
              </Form.Group>
              <Form.Select disabled={!user?.email} name='rating' aria-label="Default select example">
                <option>Your rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
              <Button type='submit' disabled={!user?.email} variant='primary' className='mt-2 mb-2'>Submit</Button>
              {productReviewed}
            </Form>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default ProductDetailsComp