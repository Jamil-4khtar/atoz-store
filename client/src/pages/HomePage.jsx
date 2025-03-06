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

      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-2 p-4">
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