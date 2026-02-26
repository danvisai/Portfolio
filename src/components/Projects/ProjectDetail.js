import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Particle from "../Particle";
import { getProjectBySlug } from "./projectsData";

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
              <img src={project.imgPath} alt={project.title} className="img-fluid" />
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
              <h2>Writeup Sections</h2>
              <p className="project-detail-helper">
                This page is a template. Replace the placeholder text below with your
                technical breakdown, visuals, and implementation notes.
              </p>
              <div className="project-detail-sections">
                {project.details?.map((section) => (
                  <section key={section.heading} className="project-detail-block">
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ProjectDetail;
