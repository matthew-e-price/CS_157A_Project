import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';

const Home = () => {
  const [playerEmail, setPlayerEmail] = useState("");
  const [otherPlayerName, setOtherPlayerName] = useState("");
  const navigate = useNavigate();

  const searchPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`api/allPlayers?name=${otherPlayerName}`);
      navigate(`/playerSearch`, {state: response.data})
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid name")
        setPlayerEmail("");
      }
      else {
        console.error("Error: ", error);
      }
    }
  };

  const findPlayerInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`api/getPlayerByEmail/${playerEmail}`);
      navigate(`/playerInfo/${playerEmail}`)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid userID")
        setPlayerEmail("");
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
      className="main-content d-flex flex-column justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh"}}
    >
      <Row className="mb-5" style={{width: "100vw"}}>
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Bowler App</p>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "100vw", marginBottom: "10rem"}}>
        <Col xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
          <Form className={"bg-white px-4 py-3 rounded-4"} onSubmit={searchPlayer}>
            <Form.Group controlid={"playerSearch"}>
              <Form.Label className={"fw-bold"}>Enter Player Name to Search:</Form.Label>
              <Form.Control type="text" value={otherPlayerName} onChange={(e) => setOtherPlayerName(e.target.value)} />
              <Button
                variant="light"
                type="submit"
                className="mt-3 mb-3 fw-bold"
                style={{
                  border: "solid",
                  borderColor: "var(--border-color)",
                }}
              >
                Find Player
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
        </Col>

        <Col xs={{span: 4, offset: 0.5}} xl={{span: 4, offset: 0.5}} xxl={{span: 2, offset: 0.5}}>
          <Form className={"bg-white px-4 py-3 rounded-4"} onSubmit={findPlayerInfo}>
            <Form.Group controlid={"playerSearch"}>
              <Form.Label className={"fw-bold"}>Enter Email to See Your Info:</Form.Label>
              <Form.Control type="text" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} />
              <Button
                variant="light"
                type="submit"
                className="mt-3 mb-3 fw-bold"
                style={{
                  border: "solid",
                  borderColor: "var(--border-color)",
                }}
              >
                See Information
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
                Register Player
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Home