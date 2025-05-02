import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { errData, saveLoginData, startFetch } from '../../redux/slices/loginSlice';





function RegisterPageComp({ registerApi, userState, dispatch }) {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);
  const [errMsg, setErrMsg] = useState("")

  const [passData, setPassData] = useState({
    password: "", confirmPass: ""
  })

  const { user, loading, error } = userState

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    // console.log(form.elements)

    var { firstName, lastName, email, password } = form.elements;
    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    password = password.value;
    console.log(firstName, lastName, email, password)

    if (form.checkValidity() === true && firstName && lastName && email && password) {

      dispatch(startFetch())

      registerApi(firstName, lastName, email, password)
        .then(res => {
          console.log(res)
          dispatch(saveLoginData(res.user))

          sessionStorage.setItem("userInfo", JSON.stringify(res.user))
          navigate("/user", { replace: true })
        })
        .catch(err => {
          console.log(err.response?.data?.error || err.response?.data?.message)
          dispatch(errData(err.response?.data?.error || err.response?.data?.message))
        })
    }
    setValidated(true);
  };

  const { password, confirmPass } = passData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassData({ ...passData, [name]: value })

    // Get the password and confirm password values
    const newPassword = name === 'password' ? value : password;
    const newConfirmPass = name === 'confirmPass' ? value : confirmPass;
    
    if (newPassword === newConfirmPass) {
      if (name === "confirmPass") {
        e.target.setCustomValidity("")
        setErrMsg("")
      }
      if (newPassword.length < 6 && name === "confirmPass") {
        setErrMsg("Password should have atleast 6 characters")
      }
    } else {
      if (name === "confirmPass") {
        setErrMsg("Both passwords should match.")
        e.target.setCustomValidity("Both passwords should match.")
      }
    }
  }

  return (
    <Container fluid>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group md="4" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Mark"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="4" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Otto"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" defaultValue="Jamil@gmail.com" required />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" placeholder="Enter your password."
                minLength={6} name='password' required
                onChange={handleChange}
                value={password}
              />
              <Form.Control.Feedback type="invalid">
                {/* Password should have atleast 6 characters */errMsg}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="3" controlId="confirmPass">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password" placeholder="Confirm Password" name='confirmPass' required
                onChange={handleChange}
                value={confirmPass}
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                {/* Both passwords should match. */errMsg}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Row>
              <Col>
                Do you have an account already?
                <Link to={"/login"}>Login</Link>
              </Col>
            </Row>
            <Button type="submit">
              {loading &&
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />}
              {loading ? "Loading..." : "Submit"}</Button>
            <Alert show={error} variant="danger">
              {error}
            </Alert>
            <Alert show={user} variant="info">
              User created successfully
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPageComp