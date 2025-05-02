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

      socket.on("disconnected", ({reason, socketId}) => {
        // console.log(socketId, reason)
        dispatch(removeChatRoom(socketId))
      })
      return () => {
        socket.disconnect()
      }

    }
  }, [user?.isAdmin])


  return (
    <Navbar collapseOnSelect expand="lg" className='bg-body-tertiary'>
      <Container>
        <Link className='text-decoration-none me-5' to="/">
          {/* <Image src='images/logo.jpeg' fluid style={{height: "40px", borderRadius: "40%", objectFit: "cover", marginRight: "10px"}} /> */}
          <Navbar.Brand>A/Z Store</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title={searchCat}>
                <Dropdown.Item onClick={() => setSearchCat("All")}>All</Dropdown.Item>
                {
                  categories.map((c, idx) => (
                    <Dropdown.Item key={idx} onClick={() => setSearchCat(c.name)}>{c.name}</Dropdown.Item>
                  ))
                }
              </DropdownButton>
              <Form.Control type="text" onKeyUp={submitHandler} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." />
              <Button variant="warning" onClick={submitHandler}>
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>

            {user && user.isAdmin &&
              <Nav.Link as={Link} to="/admin/orders">
                Admin
                {messageRecieved &&
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                }
              </Nav.Link>
            }

            {!user &&
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            }

            {user &&
              <NavDropdown title={user?.firstName} id="collapsible-nav-dropdown">

                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout(dispatch)} >Logout</NavDropdown.Item>
              </NavDropdown>
            }
            <Nav.Link as={Link} to="/cart">
              <i className="bi bi-cart4"></i> CART
              <Badge pill bg="danger">
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