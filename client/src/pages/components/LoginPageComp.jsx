import { useState } from 'react';
import { Container, Button, Col, Row, InputGroup, Form, Spinner, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { errData, saveLoginData, startFetch } from '../../redux/slices/loginSlice';


function LoginPageComp({ userLoginApi }) {
  const [validated, setValidated] = useState(false);
  // const [loginStatus, setLoginStatus] = useState({
  //   success: "", error: "", loading: false
  // });
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.login)
  // console.log(user, loading, error)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    // console.log(form.elements)
    var { email, password, rememberMe } = form.elements;
    email = email.value
    password = password.value
    rememberMe = rememberMe.checked
    // console.log(email, password, rememberMe)

    if (form.checkValidity() === true && email && password) {
      // setLoginStatus({ loading: true })
      dispatch(startFetch())

      userLoginApi(email, password, rememberMe)
        .then(res => {
          // setLoginStatus({ success: res.message, loading: false, error: "" })
          dispatch(saveLoginData(res.user))
          // console.log(res)


          if (rememberMe) {
            localStorage.setItem("userInfo", JSON.stringify(res.user))
          } else {
            sessionStorage.setItem("userInfo", JSON.stringify(res.user))
          }

          if (!res.user.isAdmin) {
            navigate("/user", { replace: true })
          } else {
            navigate("/admin/orders", { replace: true })
          }
        })
        .catch(err => {
          console.log(err.response?.data)
          // setLoginStatus({ error: err.response?.data?.error })
          dispatch(errData(err.response?.data?.error))
        })
    }
    // form.reset()
    setValidated(true);
  };

  return (
    <Container fluid>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group md="6" /* controlId="email" */>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name='email' defaultValue="aamir@gmail.com" required />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="3" /* controlId="password" */>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" placeholder="Enter your password."
                minLength={6} name='password' required
              />
              <Form.Control.Feedback type="invalid">
                Password should have atleast 6 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" /* controlId='rememberMe' */>
              <Form.Check
                // required
                label="Remember me"
                name='rememberMe'

              />
            </Form.Group>

            <Row>
              <Col>
                Don't have an account?
                <Link to={"/register"}>Register</Link>
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

              {loading ? "Loading..." : "Login"}</Button>
            <Alert
              variant={loading && "warning" || user && "success" || error && "danger"}

              show={loading || error || user}
            >
              {error || user && "User logged in successfully"}
            </Alert>
           
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPageComp