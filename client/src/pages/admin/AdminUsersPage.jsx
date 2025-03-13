import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinks from "../../components/admin/AdminLinks";

const deleteHandler = () => { 
  if (window.confirm("Are you sure?")) {
    alert("Deleted User")
  }
 }

const AdminUsersPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks/>
      </Col>
      <Col md={10}>
        <h1>Users</h1>
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
            {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
              (item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>Mark</td>
                  <td>Twain</td>
                  <td>mark@twain.com</td>
                  <td>
                    <i className={item}></i>
                  </td>
                  <td>
                    <Button className="btn-sm m-1" as={Link} to={"/admin/edit-user"}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="btn-sm" variant="danger" onClick={deleteHandler} >
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

export default AdminUsersPage


