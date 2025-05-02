import axios from 'axios'
import { addToCart } from '../redux/slices/cartSlice';

const fetchAndAddToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios.get("/api/products/p/"+id);
  dispatch(addToCart({data, qty: parseInt(qty)}))
}




export { fetchAndAddToCart };