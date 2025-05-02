import CartPageComp from "./components/CartPageComp"
import { useSelector, useDispatch } from 'react-redux'
import { setQuantity, removeFromCart } from "../redux/slices/cartSlice"

function CartPage() {
  const dispatch = useDispatch()
  const { totalItems, cartItems, cartSubTotal } = useSelector(state => state.cart)


  return (
    <CartPageComp 
      totalItems={totalItems}
      cartItems={cartItems}
      cartSubTotal={cartSubTotal}
      dispatch={dispatch}
      setQuantity={setQuantity}
      removeFromCart={removeFromCart}
    />
  )
}

export default CartPage