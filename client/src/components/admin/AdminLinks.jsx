import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logout from '../../utils/logout'

function AdminLinks() {
  const dispatch = useDispatch()
  return (
    <Navbar>
      <Nav className="flex-column">
        <Nav.Link as={Link} to={"/admin/orders"}>Orders</Nav.Link>
        <Nav.Link as={Link} to={"/admin/products"}>Products</Nav.Link>
        <Nav.Link as={Link} to={"/admin/user"}>User List</Nav.Link>
        <Nav.Link as={Link} to={"/admin/chats"}>Chats</Nav.Link>
        <Nav.Link as={Link} to={"/admin/analytics"}>Analytics</Nav.Link>
        <Nav.Link onClick={() => logout(dispatch)} >Logout</Nav.Link>
      </Nav>
    </Navbar>

  )
}

export default AdminLinks