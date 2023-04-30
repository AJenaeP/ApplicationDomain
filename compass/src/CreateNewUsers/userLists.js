import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UserDataService from "../services/users.services";

const UsersList = ({ getUserId }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await UserDataService.deleteUser(id);
    getUsers();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getUsers}>
          Refresh List
        </Button>
      </div>

      {}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>role</th>
            <th>Start Date</th>
            <th>Account Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.userId}</td>
                <td>{doc.firstName}</td>
                <td>{doc.lastName}</td>
                <td>{doc.email}</td>
                <td>{doc.role}</td>
                <td>{doc.startDate}</td>
                <td>{doc.accountStatus}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getUserId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
