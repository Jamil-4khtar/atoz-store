import React, { useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { saveLoginData } from '../../../redux/slices/loginSlice';

function UserProfilePageComp({ updateProfileApi, getUserProfileInfo, id }) {
  const [profileInfo, setProfileInfo] = useState({})
  const [submitStatus, setSubmitStatus] = useState({
    loading: false, error: null, success: null
  })
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    getUserProfileInfo(id).then(res => {
      setProfileInfo(res.profile)
      console.log(res.profile)
      const updatedUserInfo = {
        _id: id,
        firstName: res.profile.firstName,
        lastName: res.profile.lastName,
        isAdmin: res.profile.isAdmin,
        email: res.profile.email
      };
      dispatch(saveLoginData(updatedUserInfo));

    }).catch(err => {
      console.log(err.response?.data?.error || err.response?.data?.message)
    })
  }, [id, submitStatus.loading, getUserProfileInfo])

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (event.currentTarget.checkValidity() === true && firstName && lastName /* && phoneNumber && address && country && zipCode && city && state */ && password && confirmPassword) {
      // console.log(firstName, lastName, password, phoneNumber, address, country, city, zipCode, state)
      setSubmitStatus({ ...submitStatus, loading: true })
      updateProfileApi(firstName, lastName, password, phoneNumber, address, country, city, zipCode, state).then(res => {
        console.log(res)

        setSubmitStatus({ ...submitStatus, success: res.message, error: null })

        const updatedUserInfo = {
          _id: id,
          firstName,
          lastName,
          isAdmin: profileInfo.isAdmin,
          email: profileInfo.email
        };

        if (localStorage.getItem("userInfo")) {
          localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        } else {
          sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        }

        dispatch(saveLoginData(updatedUserInfo));

      }).catch(err => {
        const errorMessage = err.response?.data?.error || err.response?.data?.message || "Update failed";
        setSubmitStatus({
          ...submitStatus,
          error: errorMessage,
          success: null
        });
        console.error("Profile update error:", errorMessage);
      })

    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Change your profile</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={profileInfo.firstName}
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={profileInfo.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                disabled
                value={`${profileInfo.email}   if you want to change email, remove account and create new one with new email address`}
              // value={profileInfo && profileInfo.email }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                defaultValue={profileInfo.phoneNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street name and house number"
                defaultValue={profileInfo.address}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                defaultValue={profileInfo.country}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Zip code"
                defaultValue={profileInfo.zipCode}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                defaultValue={profileInfo.city}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                defaultValue={profileInfo.state}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">Update</Button>
            <Alert show={submitStatus && submitStatus.error} variant="danger">
              {/* User with that email already exists! */}
              {submitStatus && submitStatus.error}
            </Alert>
            <Alert show={submitStatus.success} variant="info">
              {submitStatus.success}
            </Alert>
            {/* {console.log(submitStatus)} */}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfilePageComp