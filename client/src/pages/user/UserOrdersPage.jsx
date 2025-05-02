import React from 'react'
import UserOrdersPageComp from './components/UserOrdersPageComp'
import axios from 'axios'


const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data.orders
}

function UserOrdersPage() {
  return (
    <UserOrdersPageComp
      getOrders={getOrders}
    />
  )
}

export default UserOrdersPage