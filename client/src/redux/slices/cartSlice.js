import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalItems: 0,
    cartItems: [],
    cartSubTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload);
      const { data: product, qty } = action.payload;
      console.log(product, qty);
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );
      // console.log(existingItem);
      if (existingItem) {
        existingItem.qty += parseInt(qty);
      } else {
        state.cartItems.push({ ...product, qty: parseInt(qty) });
      }

      state.totalItems += parseInt(qty);

      state.cartSubTotal = parseFloat(
        state.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
      ).toFixed(2);
    },

    setQuantity: (state, action) => {
      var { id, qty } = action.payload;
      qty = +qty;

      const cartItem = state.cartItems.find((item) => item._id === id);

      if (cartItem) {
        const oldQty = cartItem.qty;
        cartItem.qty = qty;
        state.totalItems += qty - oldQty;
        state.cartSubTotal = parseFloat(
          state.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
        ).toFixed(2);
      }
    },
    removeFromCart: (state, action) => {
      const {
        id,
        qty = parseInt(qty),
        price = parseFloat(price),
      } = action.payload;

      console.log(id, qty, price);

      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      state.totalItems -= qty;
      state.cartSubTotal -= qty * price;
      state.cartSubTotal = parseFloat(state.cartSubTotal).toFixed(2)
    },
  },
});

export const { addToCart, setQuantity, removeFromCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
