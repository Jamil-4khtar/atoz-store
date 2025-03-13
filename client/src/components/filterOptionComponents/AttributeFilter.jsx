import React from 'react'
import { Form } from 'react-bootstrap'

function AttributeFilter() {
  return (
    <div>
      {
        [{ color: ["Red", "Blue", "Green"] }, { ram: ["1TB", "2TB"] }].map((item, idx) => (
          // console.log(item)
          <React.Fragment key={idx}>
            <Form.Label className='fw-bold'>{Object.keys(item)/* [0] */}</Form.Label>
            {
              item[Object.keys(item)].map((val, i) => (
                <React.Fragment key={i}>
                  <Form.Check type="checkbox" id={`attr-${val}`}>
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label style={{ cursor: "pointer" }}>{val}</Form.Check.Label>
                  </Form.Check>
                </React.Fragment>

              ))
            }

          </React.Fragment>
        ))
      }


    </div>
  )
}

export default AttributeFilter