import { useState } from 'react';
import {Container, Button, Col, Row, InputGroup, Form, Spinner, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'


function LoginPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container fluid>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

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
              />
              <Form.Control.Feedback type="invalid">
                Password should have atleast 6 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Remember me"
                // feedback="You must agree before submitting."
                // feedbackType="invalid"
              />
            </Form.Group>

            <Row>
              <Col>
                Don't have an account?
                <Link to={"/register"}>Register</Link>
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
              Login</Button>
            <Alert show={true} variant="danger">
              Invalid Credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage