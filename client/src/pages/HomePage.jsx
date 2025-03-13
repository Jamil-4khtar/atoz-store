import React, { useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import CategoryCard from '../components/CategoryCard'
import { shoppingCards } from '../demoData/demo';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';

function HomePage() {
  const [categories, setCategories] = useState(shoppingCards);


  return (
    <>
      <ProductCarousel />

      <Container className='p-4 m-0' fluid>
        <Row xs={1} sm={2} md={3} className="g-2">
          {
            categories.length > 0 && categories.map(c => (
              <Col key={c.id}>
                <CategoryCard title={c.name} text={c.description} image={c.image} />
              </Col>
            ))
          }
        </Row>

      </Container>


    </>
  )
}

export default HomePage