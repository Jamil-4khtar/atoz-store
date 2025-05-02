import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../utils/scrollToTop';

function AddedToCartMessage() {
  const [show, setShow] = useState(true);
  const [timer, setTimer] = useState(5)
  const navigate = useNavigate()

  ScrollToTop()

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(timer-1)
      // console.log("interval")
    }, 1000);

    return () => {
      clearInterval(timerId)
    }
  }, [timer])
  

  // console.log("rendered")
  
  return (
    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Your Item is added to cart!</Alert.Heading>
      <p>
        <Link to="/cart">
          <Button variant='success' onClick={() => navigate("/cart")}>Go To Cart</Button>
        </Link>
        {" "}
        <Button onClick={() => navigate(-1)}>Continue Shopping</Button>
      </p>
      <i>closing the window in {timer} secs...</i>
    </Alert>
  )
}

export default AddedToCartMessage