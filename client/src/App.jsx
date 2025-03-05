import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductListPage from './pages/ProductListPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoutes from './components/ProtectedRoutes'

// protected user pages
import UserCartDetailsPage from './pages/user/UserCartDetailsPage'
import UserOrderDetailsPage from './pages/user/UserOrderDetailsPage'
import UserOrdersPage from './pages/user/UserOrdersPage'
import UserProfilePage from './pages/user/UserProfilePage'

// protected admin pages
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminChatsPage from './pages/admin/AdminChatsPage'
import AdminCreateProductPage from './pages/admin/AdminCreateProductPage'
import AdminEditProductPage from './pages/admin/AdminEditProductPage'
import AdminEditUserPage from './pages/admin/AdminEditUserPage'
import AdminOrderDetailsPage from './pages/admin/AdminOrderDetailsPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'

// components
import Header from './components/Header'
import Footer from './components/Footer'
import RoutesWithChat from './components/RoutesWithChat'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<RoutesWithChat />}>
          <Route path='/' element={<HomePage />} />
          <Route path='product-list' element={<ProductListPage />} />
          <Route path='/product-details' element={<ProductDetailsPage />} />
          <Route path='/product-details/:id' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoutes admin={false} />}>
          <Route path='/user' element={<UserProfilePage />} />
          <Route path='/user/my-orders' element={<UserOrdersPage />} />
          <Route path='/user/cart-details' element={<UserCartDetailsPage />} />
          <Route path='/user/order-details' element={<UserOrderDetailsPage />} />
        </Route>



        <Route element={<ProtectedRoutes admin={true} />}>
          <Route path='/admin/user' element={<AdminUsersPage />} />
          <Route path='/admin/products' element={<AdminProductsPage />} />
          <Route path='/admin/orders' element={<AdminOrdersPage />} />
          <Route path='/admin/order-details' element={<AdminOrderDetailsPage />} />
          <Route path='/admin/edit-user' element={<AdminEditUserPage />} />
          <Route path='/admin/edit-product' element={<AdminEditProductPage />} />
          <Route path='/admin/create-product' element={<AdminCreateProductPage />} />
          <Route path='/admin/chats' element={<AdminChatsPage />} />
          <Route path='/admin/analytics' element={<AdminAnalytics />} />
        </Route>

        <Route path='*' element={<h1>404 page doesn't exists</h1>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App