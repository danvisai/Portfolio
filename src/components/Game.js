import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UnityGame from "./UnityGame";
import Particle from "./Particle";

function Game() {
  return (
    <Container fluid className="game-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={12}
            style={{
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 className="project-heading">
              My <strong className="purple">Unity Game</strong>
            </h1>
            <p style={{ color: "white" }}>
              Check out my game built with Unity!
            </p>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={12}>
            <UnityGame />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Game;
