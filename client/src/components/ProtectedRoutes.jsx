import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

function ProtectedRoutes({ admin }) {
  let isLogin = false;
  if (admin) {
    const adminAuth = false; // admin demo
    if(adminAuth) isLogin = true
  } else {
    const userAuth = false // user demo
    if(userAuth) isLogin = true
  }

  return isLogin ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes