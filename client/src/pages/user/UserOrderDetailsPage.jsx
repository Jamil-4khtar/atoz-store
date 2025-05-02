import React from 'react'
import UserOrderDetailsComp from './components/UserOrderDetailsComp'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UserOrderDetailsPage() {
  const {user} = useSelector(state => state.login)
  const { id } = useParams()
  // console.log(id)

  const dispatch = useDispatch()



  const getUser = async () => {
    console.log(user._id)
    const { data } = await axios.get("/api/users/profile/" + user._id);
    return data.profile;
  }

  const getOrder = async (orderId) => {
    console.log("orderId", orderId)
      const { data } = await axios.get("/api/orders/user/" + orderId)
      return data.order
    }

  const updateOrder = async (orderId) => {
    const { data } = await axios.put("/api/orders/paid/" + orderId);
    return data
  }

  return (
    <UserOrderDetailsComp
      user={user}
      getUser={getUser}
      dispatch={dispatch}
      getOrder={getOrder}
      orderId = {id}
      updateOrder={updateOrder}
    />
  )
}

export default UserOrderDetailsPage