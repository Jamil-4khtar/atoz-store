import React from 'react'
import { Container, Row, Col, ListGroup, Button, Pagination } from 'react-bootstrap'
import SortOptions from '../components/SortOptions'
import PriceFilter from '../components/filterOptionComponents/PriceFilter'
import RatingFilter from '../components/filterOptionComponents/RatingFilter'
import CategoryFilter from '../components/filterOptionComponents/CategoryFilter'
import AttributeFilter from '../components/filterOptionComponents/AttributeFilter'
import ProductCard from '../components/ProductCard'
import PaginationComponent from '../components/PaginationComponent'
import ScrollToTop from '../utils/scrollToTop'


function ProductListPage() {

  ScrollToTop()

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant='flush' >
            <ListGroup.Item className='mb-3 mt-3'><SortOptions/></ListGroup.Item>
            <ListGroup.Item><PriceFilter/></ListGroup.Item>
            <ListGroup.Item><RatingFilter/></ListGroup.Item>
            <ListGroup.Item><CategoryFilter/></ListGroup.Item>
            <ListGroup.Item><AttributeFilter/></ListGroup.Item>
            <ListGroup.Item style={{display: "flex", gap: "10px", justifyContent: "start"}}>
              <Button variant="primary">Apply</Button>
              <Button variant="danger">Clear</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {
            Array.from({length: 4}).map((_, i) => (
              <React.Fragment key={i}>
                <ProductCard/>

              </React.Fragment>
            ))
          }
          <PaginationComponent/>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductListPage