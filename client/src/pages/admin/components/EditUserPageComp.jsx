import {
  Row,
  Col,
  Container,
  Form,
  Button,

} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditUserPageComp = ({ updateUserApi, fetchTheUser, id }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [updateStatus, setUpdateStatus] = useState({
    message: "", error: ""
  });
  const navigate = useNavigate();




  useEffect(() => {
    fetchTheUser(id)
      .then(data => {
        setUser(data)
        setIsAdmin(data.isAdmin)
      })
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const formEle = event.currentTarget.elements;

    const firstName = formEle.firstName.value;
    const lastName = formEle.lastName.value;
    const email = formEle.email.value;
    const isAdmin = formEle.isAdmin.checked;


    if (form.checkValidity() === true) {
      setUpdateStatus({ message: "Updating..."})
      updateUserApi(id, firstName, lastName, email, isAdmin)
        .then(data => {
          if (data) {
            setTimeout(() => {
            }, 1000);
            setTimeout(() => {
              setUpdateStatus({ message: "Redirecting to Users page..."})
            }, 2000);
            setTimeout(() => {
              navigate("/admin/user")
            }, 3000);
          }
        })
        .catch(err => {
          setUpdateStatus({ error: err.response?.data?.message})
        })
    }


    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/user" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit User</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" required type="text" defaultValue={user.firstName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" required type="text" defaultValue={user.lastName} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="email"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="isAdmin">
              <Form.Check name="isAdmin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} type="checkbox" label="Is Admin" />
            </Form.Group>

            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateStatus?.message}
            {updateStatus?.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComp