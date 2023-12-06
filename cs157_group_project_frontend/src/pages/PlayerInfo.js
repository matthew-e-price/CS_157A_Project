import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
axios.defaults.baseURL = 'http://localhost:8080';

const PlayerInfo = () => {
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [playerBirthday, setPlayerBirthday] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const {email} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/getPlayerByEmail/${email}`);
        setPlayer(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setPlayerEmail(email);
    setPlayerName(player.name);
    setPlayerBirthday(player.birthday);
  }, [player])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

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
      className="main-content d-flex flex-column align-items-center justify-content-center pb-5"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh" }}
    >
      <Row className="mb-5" style={{width: "90vw"}}>
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Player Info</p>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "90vw", marginBottom: "3rem"}}>
        <Col xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
          <Form className={"bg-white px-4 py-3 rounded-4"} onSubmit={handleSubmit}>
            <Form.Group controlid={"name"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Name:</Form.Label>
              <Form.Control disabled type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            </Form.Group>
            <Form.Group controlid={"email"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Email:</Form.Label>
              <Form.Control disabled type="text" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlid={"birthday"} className={"mb-3"}>
              <Form.Label className={"fw-bold"}>Birthday:</Form.Label>
              <Form.Control disabled type="date" value={playerBirthday} onChange={(e) => setPlayerBirthday(e.target.value)} />
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
                Update
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
      <Row className="d-flex align-items-center justify-content-center mb-3" style={{width: "95vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Date</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F1</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F2</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F3</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F4</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F5</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F6</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F7</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F8</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F9</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>F10</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Score</p>
        </Col>
      </Row>
        {player.playedGames?.map((games) => {
          return (
            <Row className="d-flex align-items-center justify-content-center" style={{width: "95vw", backgroundColor: "whitesmoke"}}>
              <Col className={"border border-black"}>
                <p className={"fw-bolder text-center m-1"}>{games.game.date}</p>
              </Col>
              {games.frames?.map((frames) => {
                return (
                  <Col className={"border border-black"}>
                    <p className={"fw-bolder text-center m-1"}>{frames.throw1} | {frames.throw2}</p>
                  </Col>
                )
              })}
              <Col className={"border border-black"}>
                <p className={"fw-bolder text-center m-1"}>{games.score}</p>
              </Col>
            </Row>
          )
        })}
    </div>
  );
}

export default PlayerInfo