import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import ds from "../../Assets/Projects/ds.png";
import ig from "../../Assets/Projects/ig.png";
import marketplace from "../../Assets/Projects/marketplace.png";
import pb from "../../Assets/Projects/pb.png";
import aqp from "../../Assets/Projects/aqp.png";
import apo from "../../Assets/Projects/apo.png";
import spa from "../../Assets/Projects/spa.png";
import gce from "../../Assets/Projects/gce.png";
import ge from "../../Assets/Projects/ge.jpg";

function Projects() {
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
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={spa}
              isBlog={false}
              title="Spatial Arrangement Gmae"
             ghLink="https://github.com/danvisai/AgriCrop"
              description="A specialized VR game utilizing Unity3D, integrating sensory-friendly design elements, spatial organization challenges, and interactive tasks to promote cognitive engagement and enhance spatial cognition for individuals with autism."
              //demoLink=""
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ge}
              isBlog={false}
              title="Game Engine"
              ghLink=""
              description="Developed an engine using C++, OpenGL using entity component system"
              //demoLink=""
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={gce}
              isBlog={false}
              title="Generative AI canvas Editor"
              ghLink="https://github.com/danvisai/Final_project_Backend/"
              description=""
              //demoLink=""
            />
          </Col>
                
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={marketplace}
              isBlog={false}
              title="NFT MARKET PLACE"
              description="NFT Market place that allows users to buy and sell nfts."
              ghLink="https://github.com/danvisai/AgriCrop"
              demoLink="https://www.youtube.com/watch?v=ZACIVqRDwdU"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aqp}
              isBlog={false}
              title="Automatic-Question-Paper-Generator"
              description="Automatic Question Paper Generator made with jsp, java and Css.Lets users creates quizzes and attend them."
              ghLink="https://github.com/danvisai/QuestionPaperManagementSystem"
              demoLink="https://github.com/danvisai/QuestionPaperManagementSystem"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ig}
              isBlog={false}
              title="ImageSteganography"
              description="ImageSteganography project made with python and flask. Takes an image as an input and uses it to hide a message using cryptography techniques by changing pixels of the image"
              ghLink="https://github.com/danvisai/ImageSteganography"
              demoLink=""              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ds}
              isBlog={false}
              title="CrimeAnalysis"
              description="A Data Science project made using python to analyze crime rate in a country. I have used visualization techniques and filtering techniques in the project"
              ghLink="https://github.com/danvisai/CrimeAnalysis"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pb}
              isBlog={false}
              title="PUBLICATION"
              description="Relevance of Computer Forensics in Security"
              ghLink="https://github.com/danvisai/Publications"
              
            />
          </Col>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={apo}
              isBlog={false}
              title="Apocalypse Overkill"
              description="Click on the demo to try it out"
              ghLink="https://github.com/danvisai/ApocalypseOverkill"
              demoLink="https://apocalypse-overkill.vercel.app/" 
            />
          </Col>

         
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
