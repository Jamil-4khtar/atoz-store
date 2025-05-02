import React from 'react'
import { Form } from 'react-bootstrap'

function AttributeFilter({ attrsFilter, setAttrsFromFilter }) {
  return (
    <div>
      {
        attrsFilter?.length > 0 && attrsFilter.map((item, idx) => (
          <div key={idx} className='mb-3'>
            <Form.Label>
              <b>{item.key}</b>
              {
                item.value.map((val, i) => (
                  <React.Fragment key={i}>
                    <Form.Check type="checkbox" id={`attr-${val}`}>
                      <Form.Check.Input type="checkbox"
                        onChange={(e) => {
                          setAttrsFromFilter(a => {
                            if (a.length === 0) {
                              return [{ key: item.key, value: [val] }]
                            }

                            let index = a.findIndex(t => t.key === item.key);
                            if (index === -1) {
                              return [...a, { key: item.key, value: [val] }]
                            }

                            if (e.target.checked) {
                              a[index].value.push(val)
                              let unique = [...new Set(a[index].value)];
                              a[index].value = unique;
                              return [...a];
                            }

                            let attrsAfterUnchecked = a[index].value.filter(v => v !== val);
                            a[index].value = attrsAfterUnchecked;

                            if (attrsAfterUnchecked.length > 0) {
                              return [...a];
                            } else {
                              let exceptThisKey = a.filter(t => t.key !== item.key);
                              return [...exceptThisKey]
                            }
                          })

                        }}
                      />
                      <Form.Check.Label style={{ cursor: "pointer" }}>{val}</Form.Check.Label>
                    </Form.Check>
                  </React.Fragment>

                ))
              }
            </Form.Label>
          </div>
        ))
      }
    </div>
  )
}

export default AttributeFilter
