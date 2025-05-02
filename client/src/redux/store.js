import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import chatReducer from "./slices/chatSlice";

const loadState = () => {
  try {
    const savedState = localStorage.getItem('reduxState');
    if (!savedState) return undefined;
    return JSON.parse(savedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

// Utility to save specific slices to localStorage
const saveState = (state) => {
  try {
    const partialState = {
      cart: state.cart,
      // user: state.user,
      // add more slices here if needed
    };
    localStorage.setItem('reduxState', JSON.stringify(partialState));
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

const preloadedState = loadState();


const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    category: categoryReducer,
    chat: chatReducer
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
// console.log(store.getState().cart);

export default store;
