import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  }

  return(
    <div
      className="main-content d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "var(--main-bg-color)", height: "100vh" }}
    >
      <Container>
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