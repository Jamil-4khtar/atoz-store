import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import ScrollToTop from '../../utils/scrollToTop';
import PriceFilter from '../../components/filterOptionComponents/PriceFilter';
import RatingFilter from '../../components/filterOptionComponents/RatingFilter';
import CategoryFilter from '../../components/filterOptionComponents/CategoryFilter';
import AttributeFilter from '../../components/filterOptionComponents/AttributeFilter';
import SortOptions from '../../components/SortOptions';
import ProductCard from '../../components/ProductCard';
import PaginationComponent from '../../components/PaginationComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MetaComponent from '../../components/MetaComponent';


function ProductListPageComp({ getProducts, categories }) {
  const [products, setProducts] = useState([])
  const [fetchStatus, setFetchStatus] = useState({
    error: null, loading: false, success: null
  })
  const [attrsFilter, setAttrsFilter] = useState([]);
  const [attrsFromFilter, setAttrsFromFilter] = useState([])
  // console.log(attrsFromFilter)
  const [showReset, setShowReset] = useState(false)
  const [filters, setFilters] = useState({})
  const [price, setPrice] = useState(500)
  const [ratingsFromFilter, setRatingsFromFilter] = useState({})
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({})
  const [sortOption, setSortOption] = useState("")
  const [paginationLinks, setPaginationLinks] = useState(null)
  const [pageNum, setPageNum] = useState(null)

  const { categoryName } = useParams() || "";
  const { pageNo } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  const location = useLocation();
  const navigation = useNavigate()


  useEffect(() => {
    getProducts(categoryName, pageNo, searchQuery, filters, sortOption).then(res => {
      setProducts(res.products)
      console.log(res.products)
      setPaginationLinks(res.totalPages)
      setPageNum(res.pageNum)
    })
      .catch(err => {
        setFetchStatus({ ...fetchStatus, error: err.response?.data?.error?.message })
      })
  }, [categoryName, pageNo, searchQuery, filters, sortOption])



  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(item => item.name === categoryName.replaceAll(",", "/"));
      if (categoryAllData) {
        let mainCat = categoryAllData.name.split("/")[0];
        let index = categories.findIndex(item => item.name === mainCat)
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories])



  useEffect(() => {
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      var cat = [];
      var count;
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          var name = category.split("/")[0];
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          if (count === 1) {
            var index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      })
    } else {
      if (!location.pathname.match(/\/category/)) {
        setAttrsFilter([])
      }
    }
  }, [categoriesFromFilter, categories])

  // console.log(filters)
  const handleFilter = () => {
    navigation(location.pathname.replace(/\/[0-9]+$/, ""));
    setShowReset(true)
    setFilters({
      category: categoriesFromFilter,
      price: price,
      rating: ratingsFromFilter,
      attrs: attrsFromFilter,
    })
  }

  const resetFilter = () => {
    setShowReset(false)
    setFilters({})
    window.location.href = "/product-list"
  }

  ScrollToTop

  return (
    <>
      <MetaComponent
        title={
          `${searchQuery && categoryName ? searchQuery + " || " + categoryName : searchQuery ? searchQuery : categoryName ? categoryName : ""
          } 
          || A-Z Store`
        }
      />
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup variant='flush' >
              <ListGroup.Item className='mb-3 mt-3'><SortOptions setSortOption={setSortOption} /></ListGroup.Item>
              <ListGroup.Item><PriceFilter price={price} setPrice={setPrice} /></ListGroup.Item>
              <ListGroup.Item><RatingFilter setRatingsFromFilter={setRatingsFromFilter} /></ListGroup.Item>
              {!location.pathname.match(/\/category/) &&
                <ListGroup.Item><CategoryFilter setCategoriesFromFilter={setCategoriesFromFilter} /></ListGroup.Item>
              }
              <ListGroup.Item><AttributeFilter attrsFilter={attrsFilter} setAttrsFromFilter={setAttrsFromFilter} /></ListGroup.Item>
              <ListGroup.Item style={{ display: "flex", gap: "10px", justifyContent: "start" }}>
                <Button variant="primary" onClick={handleFilter}>Apply</Button>
                {showReset && <Button variant="danger" onClick={resetFilter}>Reset</Button>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {
              products.map((item, i) => (
                <React.Fragment key={item._id}>
                  <ProductCard product={item} />
                </React.Fragment>
              ))
            }
            {paginationLinks > 1 ? (
              <PaginationComponent
                categoryName={categoryName}
                searchQuery={searchQuery}
                paginationLinks={paginationLinks}
                pageNum={pageNum}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductListPageComp