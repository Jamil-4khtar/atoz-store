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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">User List</h1>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <Table striped hover responsive className="mb-0">
              <thead>
                <tr>
                  <th className="ps-3">#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th className="text-center">Is Admin</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(
                  (user, idx) => (
                    <tr key={idx}>
                      <td className="ps-3">{idx + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td className="text-center">
                        {user.isAdmin ? 
                          <span className="badge bg-success rounded-pill"><i className="bi bi-check-lg"></i></span> : 
                          <span className="badge bg-danger rounded-pill"><i className="bi bi-x-lg"></i></span>
                        }
                      </td>
                      <td className="text-center">
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
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default UsersPageComponent