import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const UserInfo = () => {
  const [playedGames, setPlayedGames] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayedGames = async () => {
      try {
        const response = await axios.get(`/api/leaderboards`);
        setPlayedGames(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchPlayedGames();
  }, []);

  const navigateHome = () => {
    navigate("/");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
    <div
      className="main-content d-flex flex-column  align-items-center justify-content-center pb-5"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh"}}
    >
      <Row className="mb-2 w-auto">
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Leaderboard</p>
      </Row>
      <Row className="d-flex align-items-center justify-content-center" style={{width: "90vw"}}>
        <Button
          onClick={navigateHome}
          variant="light"
          className="mb-5 fw-bold w-auto"
          style={{
            border: "solid",
            borderColor: "var(--border-color)",
          }}
        >
          Return Home
        </Button>
      </Row>
      <Row className="d-flex align-items-center justify-content-center mb-3" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
        <Col className={"border border-black"}>
          <p className={"fw-bolder text-center m-1"}>Name</p>
        </Col>
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
      {playedGames?.map((games) => {
        return (
          <Row className="d-flex align-items-center justify-content-center" style={{width: "98vw", backgroundColor: "whitesmoke"}}>
            <Col className={"border border-black"}>
              <p className={"fw-bolder text-center m-1"}>{games.player.name}</p>
            </Col>
            <Col className={"border border-black"}>
              <p className={"fw-bolder text-center m-1"}>{games.game.date}</p>
            </Col>
            {games.frames?.map((frames) => {
              return (
                frames.frameNo === 10 ? (
                  <Col className={"border border-black"}>
                    <p className={"fw-bolder text-center m-1"}>{frames.throw1} | {frames.throw2} | {frames.throw3}</p>
                  </Col>
                ):(
                  <Col className={"border border-black"}>
                    <p className={"fw-bolder text-center m-1"}>{frames.throw1} | {frames.throw2}</p>
                  </Col>)
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

export default UserInfo