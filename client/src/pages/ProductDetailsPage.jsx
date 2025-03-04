import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetailsPage() {
  const { id } = useParams();

  return (
    <div>ProductDetailsPage, {id && id}</div>
  )
}

export default ProductDetailsPage