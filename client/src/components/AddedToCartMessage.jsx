import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap';

function AddedToCartMessage() {
  const [show, setShow] = useState(true);

  return (
    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Your Item is added to cart!</Alert.Heading>
      <p>
        <Link to="/cart">
          <Button variant='success'>Go To Cart</Button>
        </Link>
        {" "}
        <Button onClick={() => setShow(false)}>Continue Shopping</Button>
      </p>
    </Alert>
  )
}

export default AddedToCartMessage