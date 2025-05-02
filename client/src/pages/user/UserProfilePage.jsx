import React from 'react'
import UserProfilePageComp from './components/UserProfilePageComp'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const getUserProfileInfo = async (id) => {
  const { data } = await axios.get("/api/users/profile/" + id);
  return data
}

const updateProfileApi = async (firstName, lastName, password, phoneNumber, address, country, city, zipCode, state) => {
  const { data } = await axios.put("/api/users/profile", {
    firstName, lastName, password, phoneNumber, address, country, city, zipCode, state
  });
  return data;
}

function UserProfilePage() {
  const { _id } = useSelector(state => state.login.user)
  // console.log("iiiiiiiiiiddddddddd", _id)
  const dispatch = useDispatch()

  return (
    <UserProfilePageComp
      updateProfileApi={updateProfileApi}
      getUserProfileInfo={getUserProfileInfo}
      id={_id}
      dispatch={dispatch}
    />
  )
}


export default UserProfilePage