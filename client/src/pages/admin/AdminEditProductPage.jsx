import React from 'react'
import AdminEditProductComp from './components/AdminEditProductComp'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { saveAttr } from '../../redux/slices/categorySlice';
import { uploadImagesApi, uploadImagesCloudinaryApi } from './adminUtils/utils';


const fetchProduct = async (productId) => {
  const { data } = await axios.get("/api/products/p/" + productId);
  return data;
}

const updateProduct = async (productId, formInputs) => {
  console.log(productId)
  console.log(formInputs)
  const { data } = await axios.put(`/api/products/admin/${productId}`, formInputs);
  return data
}

const imageDeleteApi = async (imagePath, productId) => {
  let encoded = encodeURIComponent(imagePath);
  if (import.meta.env.DEV) {
    // todo: change later
    let { data } = await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    return data
  } else {
    let { data } = await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`);
    return data
  }
}


function AdminEditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category);
  console.log("categories", categories)

  return (
    <AdminEditProductComp
      categories={categories}
      fetchProduct={fetchProduct}
      id={id}
      updateProduct={updateProduct}
      navigate={navigate}
      dispatch={dispatch}
      saveAttr={saveAttr}
      imageDeleteApi={imageDeleteApi}
      uploadHandler={uploadImagesApi}
      uploadImagesCloudinaryApi={uploadImagesCloudinaryApi}
    />
  )
}

export default AdminEditProductPage