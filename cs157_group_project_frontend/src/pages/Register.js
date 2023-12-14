import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:8080';

const Register = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerBirthday, setPlayerBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addPlayer", {email: playerEmail,name: playerName, birthday: playerBirthday});
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid userID")
      }
      else {
        console.error("Error: ", error);
      }
    }
  };

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <div
      className="main-content d-flex flex-column align-items-center justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh" }}
    >
      <Row className="mb-5" style={{width: "100vw"}}>
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Player Registry</p>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "100vw", marginBottom: "10rem"}}>
        <Col xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
          <Form className={"bg-white px-4 py-3 rounded-4"} onSubmit={handleSubmit}>
            <Form.Group controlid={"name"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Enter Name:</Form.Label>
              <Form.Control required type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            </Form.Group>
            <Form.Group controlid={"email"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Enter Email:</Form.Label>
              <Form.Control required type="text" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlid={"birthday"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Enter Birthday:</Form.Label>
              <Form.Control required type="date" value={playerBirthday} onChange={(e) => setPlayerBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group controlid={"submitButton"} className={"mb-3"}>
              <Button
                variant="light"
                type="submit"
                className="mt-3 mb-3 fw-bold"
                style={{
                  border: "solid",
                  borderColor: "var(--border-color)",
                }}
              >
                Create Player
              </Button>
            </Form.Group>
            <Form.Group>
              <Button
                onClick={navigateHome}
                variant="light"
                className="mt-3 mb-3 fw-bold"
                style={{
                  border: "solid",
                  borderColor: "var(--border-color)",
                }}
              >
                Return Home
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register