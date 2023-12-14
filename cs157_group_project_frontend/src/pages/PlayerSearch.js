import {Button, Col, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const PlayerSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <div
      className="main-content d-flex flex-column  align-items-center justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", minHeight: "100vh"}}
    >
      <Row className="mb-2 w-auto">
        <p className={"fw-bolder text-center"} style={{fontSize: "60px"}}>Player Search</p>
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
      <Row className="d-flex align-items-center justify-content-center mb-3" style={{width: "90vw"}}>
        <Col className={"border border-black"} style={{backgroundColor: "whitesmoke"}} xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
          <p className={"fw-bolder text-center m-1"}>Name</p>
        </Col>
        <Col className={"border border-black"} style={{backgroundColor: "whitesmoke"}} xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
          <p className={"fw-bolder text-center m-1"}>Birthday</p>
        </Col>
      </Row>
      {location.state.map((players) => {
        return (
          <Row className="d-flex align-items-center justify-content-center" style={{width: "90vw"}}>
            <Col className={"border border-black"} style={{backgroundColor: "whitesmoke"}} xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
              <p className={"fw-bolder text-center m-1"}>{players.name}</p>
            </Col>
            <Col className={"border border-black"} style={{backgroundColor: "whitesmoke"}} xs={{span: 4}} xl={{span: 4}} xxl={{span: 2}}>
              <p className={"fw-bolder text-center m-1"}>{players.birthday}</p>
            </Col>
          </Row>
        )
      })}
    </div>
  );
}

export default PlayerSearch