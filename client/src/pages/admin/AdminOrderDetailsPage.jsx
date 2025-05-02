import React from 'react'
import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'
import axios from "axios"

function AdminOrderDetailsPage() {

  const fetchOrders = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id)
    return data.order
  }

  const markAsDelivered = async (id) => {
    const { data } = await axios.put("/api/orders/delivered/" + id)
    if (data) {
      return data
    }
  }

  return (
    <OrderDetailsPageComponent fetchOrders={fetchOrders} markAsDelivered={markAsDelivered} />
  )
}

export default AdminOrderDetailsPage 