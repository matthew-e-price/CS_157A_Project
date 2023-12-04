import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
axios.defaults.baseURL = 'http://localhost:8080';

const UserInfo = () => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const {userID} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const temp = parseInt(userID, 10);
        const response = await axios.get(`/api/getPlayer/${temp}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchUser();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addPlayer", {userName, userBirthday});
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
      className="main-content d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", height: "100vh" }}
    >
      <Container>
        <Row>
          <Form className={"bg-white px-4 py-2"} onSubmit={handleSubmit}>
            <Form.Group controlid={"userInfo"}>
              <Form.Label className={"fw-bold"}>Enter Name:</Form.Label>
              <Form.Control disabled placeholder={user.name} type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <Form.Label className={"fw-bold"}>Enter Birthday:</Form.Label>
              <Form.Control disabled placeholder={user.birthday} type="text" value={userBirthday} onChange={(e) => setUserBirthday(e.target.value)} />
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
            </Form.Group>
          </Form>
        </Row>

        <Row>
          <div className={"d-flex align-items-center justify-content-center"}>
            <Col className="mt-3 mb-3 fw-bold px-4">
              <p>UserID</p>
            </Col>
            <Col className="mt-3 mb-3 fw-bold px-4">
              <p>GameID</p>
            </Col>
            <Col className="mt-3 mb-3 fw-bold px-4">
              <p>Score</p>
            </Col>
          </div>
        </Row>
      </Container>

    </div>
  );
}

export default UserInfo