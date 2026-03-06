import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Particle from "../Particle";
import { getProjectBySlug } from "./projectsData";

function ProjectVideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const skipForward = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(v.currentTime + 10, v.duration || 0);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * (v.duration || 0);
  };

  return (
    <div className="pvp-wrap">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="pvp-video"
        onTimeUpdate={onTimeUpdate}
        onClick={togglePlay}
      />
      <div className="pvp-controls">
        <button className="pvp-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "⏸" : "▶"}
        </button>
        <div
          className="pvp-progress-bar"
          onClick={onSeek}
          role="slider"
          aria-label="Video progress"
          aria-valuenow={Math.round(progress)}
        >
          <div className="pvp-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <button className="pvp-btn pvp-btn-forward" onClick={skipForward} aria-label="Skip forward 10 seconds">
          +10s
        </button>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/project" replace />;
  }

  return (
    <Container fluid className="project-detail-section">
      <Particle />
      <Container className="project-detail-wrap">
        <Link to="/project" className="project-detail-back">
          <AiOutlineArrowLeft style={{ marginBottom: "2px" }} /> Back to Projects
        </Link>

        <Row className="project-detail-hero">
          <Col lg={7}>
            <div className="project-detail-media">
              {project.video
                ? <ProjectVideoPlayer src={project.video} />
                : <img src={project.imgPath} alt={project.title} className="img-fluid" />
              }
            </div>
          </Col>
          <Col lg={5}>
            <div className="project-detail-panel">
              <p className="project-detail-kicker">Project Detail</p>
              <h1>{project.title}</h1>
              <p className="project-detail-summary">{project.description}</p>

              <div className="project-tag-list" aria-label="Project tags">
                {project.tags?.map((tag) => (
                  <span key={tag} className="project-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-meta-list">
                <div className="project-meta-row">
                  <span className="project-meta-label">Role</span>
                  <span className="project-meta-value">{project.role}</span>
                </div>
                <div className="project-meta-row">
                  <span className="project-meta-label">Timeline</span>
                  <span className="project-meta-value">{project.timeline}</span>
                </div>
                <div className="project-meta-row">
                  <span className="project-meta-label">Stack</span>
                  <span className="project-meta-value">
                    {project.stack?.join(" • ")}
                  </span>
                </div>
              </div>

              <div className="project-detail-actions">
                {project.ghLink && (
                  <a
                    href={project.ghLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail-link"
                  >
                    <BsGithub /> GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail-link"
                  >
                    <CgWebsite /> Demo
                  </a>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="project-detail-body">
          <Col lg={12}>
            <div className="project-detail-content-card">
              <h2>Project Breakdown</h2>
              <div className="project-detail-sections">
                {project.details?.map((section) => (
                  <section key={section.heading} className="project-detail-block">
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>
              {project.gallery?.length ? (
                <div className="project-detail-gallery" aria-label="Project gallery">
                  {project.gallery.map((image) => (
                    <figure key={image.src} className="project-detail-gallery-item">
                      <img src={image.src} alt={image.alt} className="img-fluid" />
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ProjectDetail;
