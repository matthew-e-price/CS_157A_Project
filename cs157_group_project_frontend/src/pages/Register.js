import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:8080';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addPlayer", {name: userName, birthday: userBirthday});
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
      <Form className={"bg-white px-4 py-2"} onSubmit={handleSubmit}>
        <Form.Group controlid={"userInfo"}>
          <Form.Label className={"fw-bold"}>Enter Name:</Form.Label>
          <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <Form.Label className={"fw-bold"}>Enter Birthday:</Form.Label>
          <Form.Control type="text" value={userBirthday} onChange={(e) => setUserBirthday(e.target.value)} />
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
    </div>
  );
}

export default Register