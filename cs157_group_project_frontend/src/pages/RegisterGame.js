import {Col, Row, Form, Button} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:8080';

const RegisterGame = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState(0);
  const [lane, setLane] = useState(1);
  const [gameInfo, setGameInfo] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playedGameInfo, setPlayedGameInfo] = useState({});
  const [throws, setThrows] = useState({
    f1t1: 0,
    f1t2: 0,
    f2t1: 0,
    f2t2: 0,
    f3t1: 0,
    f3t2: 0,
    f4t1: 0,
    f4t2: 0,
    f5t1: 0,
    f5t2: 0,
    f6t1: 0,
    f6t2: 0,
    f7t1: 0,
    f7t2: 0,
    f8t1: 0,
    f8t2: 0,
    f9t1: 0,
    f9t2: 0,
    f10t1: 0,
    f10t2: 0,
    f10t3: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.post("/api/games", {lane: lane, date: date});
      setGameInfo(response1.data);
      const response2 = await axios.get(`/api/getPlayerByEmail/${email}`);
      setPlayerInfo(response2.data);
      const response3 = await axios.post("/api/played_games", {score: score, player: response2.data, game: response1.data});
      setPlayedGameInfo(response3.data);

      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 1,
        throw1: throws.f1t1,
        throw2: throws.f1t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 2,
        throw1: throws.f2t1,
        throw2: throws.f2t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 3,
        throw1: throws.f3t1,
        throw2: throws.f3t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 4,
        throw1: throws.f4t1,
        throw2: throws.f4t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 5,
        throw1: throws.f5t1,
        throw2: throws.f5t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 6,
        throw1: throws.f6t1,
        throw2: throws.f6t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 7,
        throw1: throws.f7t1,
        throw2: throws.f7t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 8,
        throw1: throws.f8t1,
        throw2: throws.f8t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 9,
        throw1: throws.f9t1,
        throw2: throws.f9t2,
        playedGame: response3.data
      });
      await axios.post(`/api/played_games/${response3.data.id}/frames`, {
        frameNo: 10,
        throw1: throws.f10t1,
        throw2: throws.f10t2,
        throw3: throws.f10t3,
        playedGame: response3.data
      });
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

  return(
    <div
      className="main-content d-flex flex-column align-items-center justify-content-center pb-5"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh" }}
    >
      <Row className="mb-5" style={{width: "90vw"}}>
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Register Game</p>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "40vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Email</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Date</p>
        </Col>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Lane</p>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "40vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control type={"date"} className={"p-0 m-1"} onChange={(e) => setDate(e.target.value)}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control type={"number"} className={"p-0 m-1"} onChange={(e) => setLane(Number(e.target.value))}></Form.Control>
        </Col>
      </Row>

      <Row className="d-flex align-items-center justify-content-center mt-3" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-bottom-0 border-top-0"}/>
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

      <Row className="d-flex align-items-center justify-content-center" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Throw 1</p>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f1t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f2t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f3t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f4t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f5t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f6t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f7t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f8t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f9t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f10t1: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={300} onChange={(e) => setScore(Number(e.target.value))}></Form.Control>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Throw 2</p>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f1t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f2t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f3t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f4t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f5t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f6t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f7t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f8t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f9t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f10t2: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-bottom-0 border-top-0"}/>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Throw 3</p>
        </Col>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-bottom-0 border-top-0"}/>
        <Col className={"border border-black"}>
          <Form.Control className={"p-0 m-1"} type={"number"} min={0} max={10} onChange={(e) => setThrows({...throws, f10t3: Number(e.target.value)})}></Form.Control>
        </Col>
        <Col className={"border border-bottom-0 border-top-0"}/>
      </Row>

      <Button
        variant="light"
        className="mt-3 mb-3 fw-bold"
        style={{
          border: "solid",
          borderColor: "var(--border-color)",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Button
        variant="light"
        className="mt-3 mb-3 fw-bold"
        style={{
          border: "solid",
          borderColor: "var(--border-color)",
        }}
        onClick={navigateHome}
      >
        Return Home
      </Button>
    </div>
  );
}

export default RegisterGame