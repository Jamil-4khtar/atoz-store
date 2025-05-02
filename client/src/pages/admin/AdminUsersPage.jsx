import React from 'react'
import UsersPageComponent from './components/UsersPageComponent'
import axios from 'axios'

const fetchUsers = async (signal) => {
  const { data } = await axios.get("/api/users", { signal });
  return data.users
}

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`)
  return data.message
}

function AdminUsersPage() {
  return (
    <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser}/>
  )
}

export default AdminUsersPage 