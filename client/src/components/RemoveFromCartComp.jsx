import React from 'react'
import { Button } from 'react-bootstrap'

function RemoveFromCartComp({ id, orderCreated, qty, price, removeFromCartHandler = false }) {

  return (
    <Button
      variant='secondary'
      disabled={orderCreated}
      type='button'
      onClick={removeFromCartHandler ? () => removeFromCartHandler(id, qty, price) : undefined}
    >
      <i className="bi bi-trash"></i>
    </Button>
  )
}

export default RemoveFromCartComp