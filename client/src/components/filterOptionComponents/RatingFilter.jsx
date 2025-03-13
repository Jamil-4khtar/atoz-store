import React from 'react'
import { Form } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'

function RatingFilter() {
  return (
    <div>
      <Form.Label className='fw-bold'>Rating</Form.Label>
      {
        Array.from({ length: 5 }).map((_, i) => (
          <React.Fragment key={i}>
            <Form.Check type="checkbox" className='d-flex flex-row align-items-center gap-3 ' id={`check-api-${i}`}>
              <Form.Check.Input type='checkbox' isValid />
              <Form.Check.Label style={{cursor: "pointer"}}>
                <Rating readonly={true} size={20} initialValue={5-i}/>
              </Form.Check.Label>
            </Form.Check>
          </React.Fragment>
        ))
      }

    </div>
  )
}

export default RatingFilter