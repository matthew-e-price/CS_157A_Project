import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';

const Home = () => {
  const [userID, setUserID] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userIDInt, setUserIDInt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUserIDInt(parseInt(userID, 10));
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUserIDInt(parseInt(userID, 10));
      const response = await axios.get(`api/getPlayer/${userIDInt}`);
      navigate(`/userInfo/${userIDInt}`)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid userID")
        setUserID("");
      }
      else {
        console.error("Error: ", error);
      }
    }
  };

  const navigateRegister = () => {
    navigate("/register");
  }

  const navigateLeaderboard = () => {
    navigate("/leaderboard");
  }

  return (
    <div
      className="main-content d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", height: "100vh" }}
    >
      <Form className={"bg-white px-4 py-2"} onSubmit={handleSubmit}>
        <Form.Group controlid={"playerSearch"}>
          <Form.Label className={"fw-bold"}>Enter UserID:</Form.Label>
          <Form.Control type="number" value={userID} onChange={(e) => setUserID(e.target.value)} />
          <Button
            variant="light"
            type="submit"
            className="mt-3 mb-3 fw-bold"
            style={{
              border: "solid",
              borderColor: "var(--border-color)",
            }}
          >
            Find User
          </Button>
        </Form.Group>
        <Form.Group controlid={"createPlayer"}>
          <Button
            onClick={navigateRegister}
            variant="light"
            className="mt-3 mb-3 fw-bold"
            style={{
              border: "solid",
              borderColor: "var(--border-color)",
            }}
          >
            Create User
          </Button>
        </Form.Group>
        <Form.Group controlid={"leaderboard"}>
          <Button
            onClick={navigateLeaderboard}
            variant="light"
            className="mt-3 mb-3 fw-bold"
            style={{
              border: "solid",
              borderColor: "var(--border-color)",
            }}
          >
            LeaderBoard
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Home