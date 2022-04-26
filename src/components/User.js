import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const User = (props) => {
  const {
    name,
    email,
    createdAt,
    lastLoggedIn,
    newId,
    status,
    handleSelect,
    id,
    selected,
  } = props;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("https://admin-be.herokuapp.com/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ selected: false }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => null)
      .catch((err) => console.log(err));
  }, []);

  return (
    <tr>
      <td>
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            onClick={() => handleSelect(selected, id)}
          />
        </div>
      </td>
      <td>{newId}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{lastLoggedIn}</td>
      <td>{createdAt}</td>
      <td>{status ? "Active" : "Blocked"}</td>
    </tr>
  );
};

export default User;
