import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

function ProductCarousel() {


  return (
    <Carousel >
      <Carousel.Item>
        <img className="d-block w-100 carousel" src='/images/carousel/electronic.jpeg' alt="Electronics" />
        <Link to={"/product-details"}>
          <Carousel.Caption className='text-start shadow-sm'>
            <h3>Electronics</h3>
            <p>New & trending : Electronics & Accessories</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 carousel" src='/images/carousel/household.jpeg' alt="Household items" />
        <Link to={"/product-details"}>
          <Carousel.Caption className='shadow-lg'>
            <h3>Household items</h3>
            <p>Revamp your home in style.</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 carousel" src="/images/carousel/clothing.jpeg" alt="Third slide" />
        <Link to={"/product-details"}>
          <Carousel.Caption className='text-end shadow-sm'>
            <h3>Clothing</h3>
            <p>
              Best Sellers in Clothing & Accessories
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarousel