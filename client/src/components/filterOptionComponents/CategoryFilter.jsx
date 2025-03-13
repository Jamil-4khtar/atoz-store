import React from 'react'
import {Form} from 'react-bootstrap'

function CategoryFilter() {
  return (
    <React.Fragment>
      <Form.Label className='fw-bold'>Category</Form.Label>
    <Form>
      {Array.from({length: 5}).map((_, i) => (
        <div key={i}>
          <Form.Check type="checkbox" id={`category-${i}`}>
            <Form.Check.Input type="checkbox" isValid />
            <Form.Check.Label style={{cursor: "pointer"}}>{`Category ${i}`}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
    </React.Fragment>
  )
}

export default CategoryFilter