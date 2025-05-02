import React from 'react'
import LoginPageComp from './components/LoginPageComp'
import axios from "axios"


const userLoginApi = async (email, password, rememberMe) => {
  const { data } = await axios.post("/api/users/login", { email, password, rememberMe });
  return data
}

function LoginPage() {
  return (
    <LoginPageComp userLoginApi={userLoginApi}/>
  )
}

export default LoginPage