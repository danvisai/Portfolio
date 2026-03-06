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
              Interactive <strong className="purple">3D Portfolio Space</strong>
            </h1>
            <p style={{ maxWidth: "720px", margin: "0 auto", lineHeight: "1.7", fontSize: "1.05rem", opacity: 0.82 }}>
              This is a fully interactive 3D environment built in Unity — an immersive alternative to browsing a standard webpage.
              Step inside and explore my work spatially: walk through scenes, interact with exhibits, and experience the portfolio as a living world rather than a list of cards.
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
