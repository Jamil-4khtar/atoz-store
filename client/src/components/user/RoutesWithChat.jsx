import React from 'react'
import UserChat from './UserChat'
import { Outlet } from 'react-router-dom'

function RoutesWithChat() {
  return (
    <>
      <Outlet/>
      <UserChat/>
    </>
  )
}

export default RoutesWithChat