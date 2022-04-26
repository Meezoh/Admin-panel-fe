import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import User from "../components/User";

const AdminPanel = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const token = localStorage.getItem("authToken");
  const activeUser = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const findUser =
    users.length > 0 && users.find((user) => user.email == activeUser);
  console.log(users.length > 0 && findUser);

  useEffect(() => {
    fetch("https://admin-be.herokuapp.com/api/v1/users", {
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
      })
      .catch((err) => console.log(err));

    if (users.length > 0) {
      if (!findUser) {
        localStorage.removeItem("authToken");
      }
    }

    if (findUser == undefined) {
      navigate("/login");
    }

    if (findUser && findUser.status == false) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  }, [update]);

  const handleSelect = (selected, id) => {
    fetch("https://admin-be.herokuapp.com/api/v1/users/" + id, {
      method: "PATCH",
      body: JSON.stringify({ selected: !selected }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    fetch("https://admin-be.herokuapp.com/api/v1/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleBlock = () => {
    fetch("https://admin-be.herokuapp.com/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ status: false }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const handleUnblock = () => {
    fetch("https://admin-be.herokuapp.com/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({ status: true }),
      headers: { "Content-Type": "application/json", "x-access-token": token },
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-panel">
      <h1 className="title">{title}</h1>
      <div className="toolbar">
        <Button onClick={handleBlock} type="button" className="btn btn-danger">
          Block
        </Button>
        <Button
          onClick={handleUnblock}
          type="button"
          className="btn btn-secondary"
        >
          <CgUnblock size={22} />
        </Button>
        <Button onClick={handleDelete} type="button" className="btn btn-dark">
          <MdDeleteOutline size={22} />
        </Button>
      </div>

      <Table className="table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Select</th>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              const {
                name,
                email,
                lastLoggedIn,
                createdAt,
                status,
                _id,
                selected,
              } = user;
              let newId = i + 1;
              return (
                <User
                  key={i}
                  name={name}
                  email={email}
                  lastLoggedIn={lastLoggedIn}
                  createdAt={createdAt}
                  status={status}
                  selected={selected}
                  id={_id}
                  newId={newId}
                  handleSelect={handleSelect}
                />
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
