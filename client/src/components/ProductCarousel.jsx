import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

function ProductCarousel({ bestSellers }) {
  // console.log(bestSellers)

  return (
    <Carousel >
      {
        bestSellers.length > 0 && bestSellers.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100 carousel" 
              crossOrigin='anonymous' 
              src={item.images ? item.images[0].path : null} 
              alt={item.name} 
            />
            <Link to={`/product-details/${item._id}`}>
              <Carousel.Caption className='text-start shadow-sm'>
                <h3>Bestselling product in {item.category}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default ProductCarousel