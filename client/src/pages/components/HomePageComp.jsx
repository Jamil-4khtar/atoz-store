import React, { useEffect, useState } from 'react'
import ProductCarousel from '../../components/ProductCarousel'
import CategoryCard from '../../components/CategoryCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';

function HomePageComp({ categories, getBestsellers }) {
  // console.log(categories)

  const [mainCategories, setMainCategories] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    getBestsellers()
      .then((res) => {
        setBestSellers(res)
      })
      .catch(err => {
        console.log(err.response?.data)
      })
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);



  return (
    <>
      <ProductCarousel bestSellers={bestSellers} />

      <Container className='p-4 m-0' fluid>
        <Row xs={1} sm={2} md={3} className="g-2">
          {
            mainCategories.length > 0 && mainCategories.map(c => (
              <Col key={c._id}>
                <CategoryCard title={c.name} text={c.description} image={c.image} />
              </Col>
            ))
          }
        </Row>

      </Container>


    </>
  )
}

export default HomePageComp