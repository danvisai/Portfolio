import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { PROJECTS, PROJECT_TAGS } from "./projectsData";

function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const visibleProjects =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.tags.includes(activeTag));

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <div className="project-filter-bar" role="tablist" aria-label="Project filters">
          {PROJECT_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`project-filter-chip${
                activeTag === tag ? " is-active" : ""
              }`}
              onClick={() => setActiveTag(tag)}
              role="tab"
              aria-selected={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {visibleProjects.map((project) => (
            <Col md={4} className="project-card" key={project.title}>
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
