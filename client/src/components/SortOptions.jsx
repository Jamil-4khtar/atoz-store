import React from 'react'
import {Form} from 'react-bootstrap'

function SortOptions({ setSortOption }) {
  
  return (
    <Form.Select onChange={e => setSortOption(e.target.value)} aria-label="Default select example">
      <option value={""}>SORT BY</option>
      <option value="price_1">Price: Low To High</option>
      <option value="price_-1">Price: High To Low</option>
      <option value="rating_-1">Customer Rating</option>
      <option value="name_1">Name A-Z</option>
      <option value="name_-1">Name Z-A</option>
    </Form.Select>
    )
}

export default SortOptions