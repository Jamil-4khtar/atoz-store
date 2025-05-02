import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function PaginationComponent({ categoryName, pageNum, searchQuery, paginationLinks }) {

  // console.log(categoryName, paginationLinks, pageNum)

  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;




  return (
    <Pagination>
        <Pagination.Prev as={Link} disabled={pageNum === 1} to={`${url}${pageNum - 1}`} />

      {
        Array.from({ length: 6 }, (_, i) => i + 1).map(x => (
            <Pagination.Item 
              key={x}
              as={Link}
              active={x === pageNum}
              to={`${url}${x}`}
            >
              {x}
            </Pagination.Item>
        ))
      }

        <Pagination.Next 
          disabled={pageNum === paginationLinks} 
          as={Link}
          to={`${url}${pageNum + 1}`}
        />
    </Pagination>
  )
}

export default PaginationComponent