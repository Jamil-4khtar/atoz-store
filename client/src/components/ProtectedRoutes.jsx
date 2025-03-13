import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import UserChat from './user/UserChat';


function ProtectedRoutes({ admin }) {
  let isLogin = false;
  if (admin) {
    const adminAuth = true; // admin demo
    if(adminAuth) isLogin = true
    return isLogin ? <Outlet/> : <Navigate to="/login"/>
  } else {
    const userAuth = true // user demo
    if(userAuth) isLogin = true
    return isLogin ? (
      <>
        <Outlet/>
        <UserChat/>
      </>
    ) : <Navigate to="/login"/>
  }

  // return isLogin ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes