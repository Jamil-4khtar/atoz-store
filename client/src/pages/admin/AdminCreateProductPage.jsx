import React from 'react'
import CreateProductPageComp from './components/CreateProductPageComp'
import axios from 'axios'
import { uploadImagesApi, uploadImagesCloudinaryApi } from './adminUtils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { newCategory, deleteCategory, saveAttr } from '../../redux/slices/categorySlice'

const createProductApi = async (formInputs) => {
  const { data } = await axios.post("/api/products/admin", formInputs)
  return data
}

function AdminCreateProductPage() {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.category)
  return (
    <CreateProductPageComp 
      createProductApi={createProductApi}
      uploadImagesApi={uploadImagesApi}
      uploadImagesCloudinaryApi={uploadImagesCloudinaryApi}
      categories={categories}
      dispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttr={saveAttr}
    />
  )
}

export default AdminCreateProductPage