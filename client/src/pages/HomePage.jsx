import React from 'react'
import HomePageComp from './components/HomePageComp'
import { useSelector } from 'react-redux';
import axios from 'axios'
import MetaComponent from '../components/MetaComponent';


const getBestsellers = async () => {
  const { data } = await axios.get("/api/products/bestsellers")
  return data
}


function HomePage() {
  const { categories } = useSelector(state => state.category);


  return (
    <>
      <MetaComponent
        title="Home | A-Z Store"
        description="Welcome to A-Z Store. Shop the latest products with fast delivery and secure payments."
        keywords="home, e-commerce, shop, deals"
      />
      <HomePageComp
        categories={categories}
        getBestsellers={getBestsellers}
      />
    </>
  )
}

export default HomePage