import React from 'react'
import { Nav, Navbar, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logout from '../../utils/logout'

function AdminLinks() {
  const dispatch = useDispatch()
  const location = useLocation()
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Admin Dashboard</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Nav className="flex-column">
          <Nav.Link 
            as={Link} 
            to={"/admin/orders"} 
            className={`py-3 px-4 border-bottom ${location.pathname === '/admin/orders' ? 'active bg-secondary' : ''}`}
          >
            <i className="bi bi-box me-2"></i> Orders
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to={"/admin/products"} 
            className={`py-3 px-4 border-bottom ${location.pathname === '/admin/products' ? 'active bg-secondary' : ''}`}
          >
            <i className="bi bi-grid me-2"></i> Products
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to={"/admin/user"} 
            className={`py-3 px-4 border-bottom ${location.pathname === '/admin/user' ? 'active bg-secondary' : ''}`}
          >
            <i className="bi bi-people me-2"></i> User List
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to={"/admin/chats"} 
            className={`py-3 px-4 border-bottom ${location.pathname === '/admin/chats' ? 'active bg-secondary' : ''}`}
          >
            <i className="bi bi-chat-dots me-2"></i> Chats
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to={"/admin/analytics"} 
            className={`py-3 px-4 border-bottom ${location.pathname === '/admin/analytics' ? 'active bg-secondary' : ''}`}
          >
            <i className="bi bi-bar-chart me-2"></i> Analytics
          </Nav.Link>
          <Nav.Link 
            onClick={() => logout(dispatch)} 
            className="py-3 px-4 text-danger"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </Nav.Link>
        </Nav>
      </Card.Body>
    </Card>

  )
}

export default AdminLinks