import React from 'react'
import ProductsPageComponent from './components/ProductsPageComponent'
import axios from "axios"

function AdminProductsPage() {

  const fetchProducts = async (signal) => {
    const { data } = await axios.get("/api/products/admin", { signal })
    return data
  }

  const deleteUser = async (productId) => {
    const { data } = await axios.delete(`/api/products/admin/${productId}`)
    return data
  }

  return (
    <ProductsPageComponent fetchProducts={fetchProducts} deleteUser={deleteUser}/>
  )
}

export default AdminProductsPage