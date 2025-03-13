import React from 'react'
import Form from 'react-bootstrap/Form';


function PriceFilter() {
  return (
    <div>
      <Form.Label className='fw-bold'>Filter:</Form.Label>
      <Form.Label><span className='fw-semibold'>Price should be less than: </span>5000$</Form.Label>
      <Form.Range min={10} max={1000} step={10}/>
    </div>
  )
}

export default PriceFilter

