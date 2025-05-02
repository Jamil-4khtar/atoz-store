import React from 'react'
import OrdersPageComponent from './components/OrdersPageComponent'
import axios from "axios"

function AdminOrdersPage() {

  const fetchOrders = async (signal) => {
    const { data } = await axios.get("/api/orders/admin", { signal })
    return data
  }

  return (
    <OrdersPageComponent fetchOrders={fetchOrders} />
  )
}

export default AdminOrdersPage  