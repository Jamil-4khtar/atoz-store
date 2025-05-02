import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../../components/admin/AdminLinks";
import { useState, useEffect } from "react";


const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchUsers(signal)
      .then(res => setUsers(res))
      .catch((err) => console.log(
        // err.response.data.message ? err.response.data.message : err.response.data
        err.response?.data?.message
      ));

    return () => {
      controller.abort();
    }
  }, [userDeleted])


  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId)
      // console.log(data)
      if (data === "User deleted successfully") {
        setUserDeleted(!userDeleted)
      }
    }
  }
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>User List</h1>
        {/* {console.log(users)} */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user, idx) => (
                <tr key={idx}>
                  {/* {console.log(user)} */}
                  <td>{idx + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                  </td>
                  <td>
                    <Button className="btn-sm m-1" as={Link} to={`/admin/edit-user/${user._id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user._id)} >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent 