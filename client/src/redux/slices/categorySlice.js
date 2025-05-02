import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveAttr = createAsyncThunk(
  "category/saveAttr",
  async ({ key, value, categoryChoosen }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/categories/attr", { key, value, categoryChoosen });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const newCategory = createAsyncThunk(
  "category/newCategory",
  async (category, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/categories", { category })
      return data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (category, thunkAPI) => {
    try {
      const { data } = await axios.delete("/api/categories/" + encodeURIComponent(category));
      return { message: data.message, category }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error)
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log(action.payload);
      })
      
      // save attr
      .addCase(saveAttr.fulfilled, (state, action) => {
        const { updatedCategory } = action.payload;
        if (updatedCategory) {
          state.categories = [...updatedCategory]
        }
      })
      .addCase(saveAttr.rejected, (state, action) => {
        console.log(action.payload);
      })

      //new category
      .addCase(newCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(newCategory.rejected, (state, action) => {
        console.log(action.payload);
      })

      //delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const {category} = action.payload;
        state.categories = state.categories.filter(cat => cat.name !== category);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        console.log(action.payload);
      })
  },
});



const categoryReducer = categorySlice.reducer;
export default categoryReducer;