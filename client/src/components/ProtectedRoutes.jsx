import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import UserChat from './user/UserChat';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import logout from '../utils/logout';


function ProtectedRoutes({ admin }) {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("/api/auth/me")
      .then(res => {
        if (localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")) {
          setUserInfo(res.data.verifiedUser)
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        // token expire
        if (err.response?.status === 401) {
          logout(dispatch)
        }
      })
  }, [dispatch])

  if (loading) return <>Loading...</>

  if (userInfo) {
    if (admin) { // Clicked page is for admins
      if (userInfo.isAdmin) {
        return <Outlet />
      } else {
        return <Navigate to="/unauthorized" />
      }
    } else {
      return (
        <>
          <Outlet />
          <UserChat />
        </>
      )
    }
  } else {
    console.log("i did this")
    return <Navigate to="/login" replace/>
  }

}

export default ProtectedRoutes