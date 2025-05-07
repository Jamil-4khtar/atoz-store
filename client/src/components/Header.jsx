import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logout from '../utils/logout';
import { fetchCategories } from '../redux/slices/categorySlice';
import { removeChatRoom, setMessageRecieved, setRooms } from '../redux/slices/chatSlice';
import { useSocket } from '../context/SocketContext';



function Header() {
  const user = useSelector((state) => state.login.user)
  const { totalItems } = useSelector((state) => state.cart)
  const { categories } = useSelector(state => state.category);
  const { messageRecieved } = useSelector(state => state.chat)
  // console.log("categories", categories)

  const [searchCat, setSearchCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();


  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    e.preventDefault();
    console.log(searchQuery)
    if (searchQuery.trim()) {
      if (searchCat === "All") {
        navigate(`/product-list/search/${searchQuery}`)
      } else {
        navigate(`/product-list/category/${searchCat.replaceAll("/", ",")}/search/${searchQuery}`);
      }
    } else if (searchCat !== "All") {
      navigate(`/product-list/category/${searchCat.replaceAll("/", ",")}`);
    } else {
      navigate("/product-list");
    }
  }

  useEffect(() => {
    if (user?.isAdmin && socket) {
      socket.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 10000000000000))
    }
  }, [user?.isAdmin, socket])

  useEffect(() => {
    if (user?.isAdmin) {
      var audio = new Audio("/audio/notif.wav")
      console.log(socket)
      socket.on("server sends message from client to admin", ({ user, message }) => {
        console.log(message)
        dispatch(setRooms({ user, message }))
        dispatch(setMessageRecieved(true))
        audio.play()
        setTimeout(() => {
          audio.pause()
          audio.currentTime = 0
        }, 500);
      })

      socket.on("disconnected", ({ reason, socketId }) => {
        // console.log(socketId, reason)
        dispatch(removeChatRoom(socketId))
      })
      return () => {
        socket.disconnect()
      }

    }
  }, [user?.isAdmin])


  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = (e) => {
    setIsSearching(true);
    submitHandler(e);
    setTimeout(() => setIsSearching(false), 800);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className='bg-dark bg-opacity-75 back-blurred text-white py-2 px-3 shadow sticky-top'>
      <Container>
        <Link className='text-decoration-none me-3 me-lg-4 nav-brand-link' to="/">
          <Navbar.Brand className="text-white fw-bold d-flex align-items-center">
            <i className="bi bi-shop me-2 fs-4"></i>
            <span className="brand-text">A/Z Store</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mt-2 mt-lg-0">
          <Nav className="me-auto mb-2 mb-lg-0">
            <InputGroup className="rounded shadow flex-nowrap" style={{ maxWidth: '600px' }}>

              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                title={searchCat}
                className="border-0 category-dropdown"
              >
                  <Dropdown.Item className='fw-bold' onClick={() => setSearchCat("All")}>All</Dropdown.Item>
                  <Dropdown.Divider className="my-1" />
                  {categories.map((c, idx) => (
                    <Dropdown.Item key={idx} onClick={() => setSearchCat(c.name)}>{c.name}</Dropdown.Item>
                  ))}
              </DropdownButton>

              <Form.Control
                type="text"
                onKeyUp={submitHandler}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="border-0 shadow-none search-input"
                aria-label="Search products"
                autoComplete="off"
              />
              <Button
                variant="warning"
                onClick={handleSearchSubmit}
                className="d-flex align-items-center justify-content-center search-button"
                style={{ width: '46px' }}
                disabled={isSearching}
                aria-label="Search"
              >
                {isSearching ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <i className="bi bi-search"></i>
                )}
              </Button>
            </InputGroup>
          </Nav>
          <Nav className="align-items-center gap-3">

            {user && user.isAdmin &&
              <Nav.Link
                as={Link}
                to="/admin/orders"
                className="text-white position-relative me-3 nav-link-hover d-flex align-items-center"
              >
                <i className="bi bi-speedometer2 me-1"></i> Admin
                {messageRecieved &&
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle pulse-animation"></span>
                }
              </Nav.Link>
            }

            {!user &&
              <>
                <Nav.Link as={Link} to="/login" className="text-white me-3 nav-link-hover d-flex align-items-center">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white me-3 nav-link-hover d-flex align-items-center">
                  <i className="bi bi-person-plus me-1"></i> Register
                </Nav.Link>
              </>
            }

            {user &&
              <NavDropdown
                title={
                  <span className="text-white d-inline align-items-center">
                    <i className="bi bi-person-circle me-1"></i>
                    <span className="d-none d-sm-inline">{user?.firstName}</span>
                  </span>
                }
                id="collapsible-nav-dropdown"
                align="end"
                className="me-3 nav-dropdown-custom"
              >
                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders" className="dropdown-item-hover">
                  <i className="bi bi-box me-2"></i> My Orders
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user" className="dropdown-item-hover">
                  <i className="bi bi-person me-2"></i> My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout(dispatch)} className="text-danger dropdown-item-hover">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            }
            <Nav.Link as={Link} to="/cart" className="text-white px-3 position-relative nav-link-hover">
              <i className="bi bi-cart4 fs-5"></i>
              <Badge pill bg="danger" className="position-absolute top-0 end-0 ">
                {totalItems || 0}
              </Badge>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header