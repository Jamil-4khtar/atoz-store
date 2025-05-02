import React from 'react'
import UserCartDetailsCom from './components/UserCartDetailsCom'
import { useSelector, useDispatch } from 'react-redux'
import { setQuantity, removeFromCart } from '../../redux/slices/cartSlice'
import axios from 'axios'

function UserCartDetailsPage() {
  const { totalItems, cartItems, cartSubTotal } = useSelector(state => state.cart)
  const {user} = useSelector(state => state.login)

  const dispatch = useDispatch()

  const getUser = async () => {
    console.log(user._id)
    const { data } = await axios.get("/api/users/profile/" + user._id);
    return data.profile;
  }

  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders/", orderData)
    return data.createdOrder
  }

  


  return (
    <UserCartDetailsCom
      totalItems={totalItems}
      cartItems={cartItems}
      cartSubTotal={cartSubTotal}
      dispatch={dispatch}
      setQuantity={setQuantity}
      removeFromCart={removeFromCart}
      getUser={getUser}
      user={user}
      createOrder={createOrder}
    />
  )
}

export default UserCartDetailsPage