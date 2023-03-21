
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import PasswordDataService from "../services/passwords.services";

const PasswordsList = ({ getPasswordId }) => {
  const [passwords, setPasswords] = useState([]);
  useEffect(() => {
    getPasswords();
  }, []);

  const getPasswords = async () => {
    const data = await PasswordDataService.getAllPasswords();
    console.log(data.docs);
    setPasswords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PasswordDataService.deletePassword(id);
    getPasswords();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getPasswords}>
          Refresh List
        </Button>
      </div>

      {}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User Id</th>
            <th>password</th>
            <th> Expiration Date</th>
           
          </tr>
        </thead>
        <tbody>
          {passwords.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.userId}</td>
                <td>{doc.password}</td>
                <td>{doc.passwordExpiration}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getPasswordId(doc.id)}
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

export default PasswordsList;
