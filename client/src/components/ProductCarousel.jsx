import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function ProductCarousel() {
  

  return (
    <Carousel >
      <Carousel.Item>
        <img className="d-block w-100 carousel" src='/images/carousel/electronic.jpeg' alt="Electronics" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 carousel" src='/images/carousel/household.jpeg' alt="Household items"  />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 carousel" src="/images/carousel/clothing.jpeg" alt="Third slide"  />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarousel