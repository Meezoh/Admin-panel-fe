import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = ({ title }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const details = { name, email, password };

  const handleSignin = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://admin-be.herokuapp.com/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(details),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.msg) {
          setError(result.msg);
          setShow(true);
        } else {
          const token = result.user.token;
          localStorage.setItem("authToken", token);
          localStorage.setItem("email", email);
          navigate("/");
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="Register">
      <h1 className="title">{title} Sign Up</h1>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      )}
      <Form onSubmit={handleSignin}>
        <Col>
          <Form.Control
            className="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Col>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={13}>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Col sm={13}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Button disabled={loading ? true : false} type="submit">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </Form>

      <p className="login-here">
        Already a user? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
