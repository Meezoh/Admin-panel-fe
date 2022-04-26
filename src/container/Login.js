import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const Login = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // validate the name and password

  const details = { email, password };

  const handleSignin = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://admin-be.herokuapp.com/api/v1/login", {
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
        } else if (result.user.status == false) {
          setError("You have been blocked!!");
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
    <div className="Login">
      <h1 className="title">{title}</h1>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      )}
      <p>Sign into your account</p>

      <Form onSubmit={handleSignin}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={13}>
            <Form.Control
              type="email"
              placeholder="Email"
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col>
            <Button disabled={loading ? true : false} type="submit">
              {loading ? "Loading..." : "Sign in"}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <p className="register-here">
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
