import { createSlice } from "@reduxjs/toolkit";

const getLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: getLocal,
    loading: false,
    error: null,
  },
  reducers: {
    startFetch: (state) => {
      state.loading = true;
    },
    saveLoginData: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    errData: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null
    },
    clearData: (state) => {
      (state.user = null), (state.loading = false), (state.error = null);
    },
  },
});


export const { startFetch, saveLoginData, errData, clearData } = loginSlice.actions;

const loginReducer = loginSlice.reducer;
export default loginReducer;
