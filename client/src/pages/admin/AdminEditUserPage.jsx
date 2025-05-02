import React from 'react'
import EditUserPageComp from './components/EditUserPageComp'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const fetchTheUser = async (id) => {
  const { data } = await axios.get("/api/users/"+id);
  return data.user;
}

const updateUserApi = async (id, firstName, lastName, email, isAdmin) => {
  console.log(id, firstName, lastName, email, isAdmin)
  const { data } = await axios.put("/api/users/"+id, { firstName, lastName, email, isAdmin});
  return data.user
}

function AdminEditUserPage() {
  const { id } = useParams()

  return (
    <EditUserPageComp
      updateUserApi={updateUserApi}
      fetchTheUser={fetchTheUser}
      id={id}
    />
  )
}

export default AdminEditUserPage