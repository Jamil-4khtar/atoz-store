import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className='bg-body-tertiary'>
      <Container>
        <Link className='text-decoration-none' to="/">
          <Navbar.Brand>A/Z Store</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
                <Dropdown.Item>Households</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="Search..." />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>

            <Nav.Link as={Link} to="/admin/orders">
              Admin
              <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/login">Register</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <i className="bi bi-cart4"></i> CART
              <Badge pill bg="danger">
                2
              </Badge>
            </Nav.Link>
            <NavDropdown title="User" id="collapsible-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Divider />

              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header