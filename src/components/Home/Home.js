import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeBg from "../../Assets/home-bg.jpg";
import Particle from "../Particle";
import Home2 from "./Home2";
import HeroFlythrough3D from "./HeroFlythrough3D";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content graphics-hero">
          <Row className="graphics-hero-row">
            <Col lg={12}>
              <div className="hero-stage-shell">
                <div className="hero-stage-grid" aria-hidden="true" />
                <div className="hero-stage-vignette" aria-hidden="true" />

                <div className="hero-video-frame">
                  <div
                    className="hero-3d-fallback"
                    style={{ backgroundImage: `url(${homeBg})` }}
                    aria-hidden="true"
                  />
                  <HeroFlythrough3D />
                  <div className="hero-video-overlay" />
                  <div className="hero-scanline" aria-hidden="true" />
                  <div className="hero-copy">
                    <p className="hero-kicker">Graphics Programmer Portfolio</p>
                    <h1 className="hero-title">
                      DANVI SAI
                      <span className="hero-title-sub">Realtime Rendering • Tools • Interaction</span>
                    </h1>
                    <div className="hero-type-row">
                      <Type />
                    </div>
                    <p className="hero-note">
                      Realtime Three.js flythrough template. We can replace these
                      placeholder billboards with project captures and shader demos.
                    </p>
                  </div>
                </div>

                <div className="hero-hud hero-hud-top">
                  <span>CAM_PATH: ENV_FLYTHROUGH_01</span>
                  <span>MODE: PORTFOLIO_PREVIEW</span>
                </div>
                <div className="hero-hud hero-hud-bottom">
                  <span>LEFT / RIGHT BILLBOARDS = SECTION CALLOUTS</span>
                  <span>SCROLL FOR DETAILS</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
