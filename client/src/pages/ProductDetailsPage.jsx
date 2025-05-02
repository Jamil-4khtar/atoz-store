import React from 'react'
import ProductDetailsComp from './components/ProductDetailsComp'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import MetaComponent from '../components/MetaComponent';


const getProductDetails = async (id) => {
  const { data } = await axios.get("/api/products/p/" + id);
  return data
}

const writeReviewApi = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/users/review/${productId}`, formInputs);
  return data;
}

function ProductDetailsPage() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.login)

  return (
    <ProductDetailsComp
      dispatch={dispatch}
      getProductDetails={getProductDetails}
      user={user}
      writeReviewApi={writeReviewApi}
    />
  )
}

export default ProductDetailsPage