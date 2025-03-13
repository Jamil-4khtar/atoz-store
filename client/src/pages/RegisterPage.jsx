import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [passData, setPassData] = useState({
    password: "", confirmPass: ""
  })
  const { password, confirmPass } = passData;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassData({ ...passData, [name]: value })

    // Get the password and confirm password values
    const newPassword = name === 'password' ? value : password;
    const newConfirmPass = name === 'confirmPass' ? value : confirmPass;

    if (newPassword === newConfirmPass) {
      if (name === "confirmPass") {
        e.target.setCustomValidity("")
      }
    } else {
      if (name === "confirmPass") {
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

            <Form.Group md="4" controlId="validationCustom01">
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

            <Form.Group md="4" controlId="validationCustom02">
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

            <Form.Group md="6" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" defaultValue="Jamil@gmail.com" required />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="3" controlId="validationCustom04">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" placeholder="Enter your password."
                minLength={6} name='password' required
                onChange={handleChange}
                value={password}
              />
              <Form.Control.Feedback type="invalid">
                Password should have atleast 6 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="3" controlId="validationCustom05">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password" placeholder="Confirm Password" name='confirmPass' required
                onChange={handleChange}
                value={confirmPass}
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match.
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
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Submit form</Button>
            <Alert show={true} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={true} variant="info">
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage