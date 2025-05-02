import React from 'react'
import RegisterPageComp from './components/RegisterPageComp'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';



const registerApi = async (firstName, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", { firstName, lastName, email, password })
  
  return data
}

function RegisterPage() {
  const userState = useSelector(state => state.login)
  const dispatch = useDispatch()
  console.log(userState)

  return (
    <RegisterPageComp registerApi={registerApi} userState={userState} dispatch={dispatch} />
  )
}

export default RegisterPage