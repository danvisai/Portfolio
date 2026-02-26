import ds from "../../Assets/Projects/ds.png";
import ig from "../../Assets/Projects/ig.png";
import marketplace from "../../Assets/Projects/marketplace.png";
import pb from "../../Assets/Projects/pb.png";
import aqp from "../../Assets/Projects/aqp.png";
import apo from "../../Assets/Projects/apo.png";
import spa from "../../Assets/Projects/spa.png";
import gce from "../../Assets/Projects/gce.png";
import ge from "../../Assets/Projects/ge.jpg";

export const PROJECT_TAGS = [
  "All",
  "Cyber Security / Blockchain",
  "Game Development",
  "Graphics Programming",
  "VR",
  "Level Design",
];

export const PROJECTS = [
  {
    slug: "spatial-arrangement-game",
    imgPath: spa,
    isBlog: false,
    title: "Spatial Arrangement Game",
    description:
      "A specialized VR game utilizing Unity3D, integrating sensory-friendly design elements, spatial organization challenges, and interactive tasks to promote cognitive engagement and enhance spatial cognition for individuals with autism.",
    demoLink: "https://www.youtube.com/watch?v=dRMw0R8pNFA",
    tags: ["VR", "Game Development", "Level Design"],
    timeline: "Add semester / year",
    stack: ["Unity", "C#", "XR Interaction Toolkit"],
    role: "Add your role here",
    details: [
      {
        heading: "Overview",
        body: "Describe the project goal, target users, and what problem this VR experience solves.",
      },
      {
        heading: "Technical Work",
        body: "Document interaction systems, spatial logic, performance work, and any rendering/graphics decisions.",
      },
      {
        heading: "Results",
        body: "Add outcomes, user feedback, metrics, or demo learnings.",
      },
    ],
  },
  {
    slug: "game-engine",
    imgPath: ge,
    isBlog: false,
    title: "Game Engine",
    ghLink: "",
    description: "Developed an engine using C++, OpenGL using entity component system.",
    tags: ["Graphics Programming", "Game Development"],
    timeline: "Add semester / year",
    stack: ["C++", "OpenGL", "ECS"],
    role: "Add your role here",
    details: [
      {
        heading: "Engine Architecture",
        body: "Describe core subsystems (rendering, ECS, input, asset loading, scene management).",
      },
      {
        heading: "Rendering Pipeline",
        body: "Add shader stages, material system details, lighting model, and optimization decisions.",
      },
      {
        heading: "Challenges",
        body: "Document debugging, memory/performance issues, and how you solved them.",
      },
    ],
  },
  {
    slug: "generative-ai-canvas-editor",
    imgPath: gce,
    isBlog: false,
    title: "Generative AI Canvas Editor",
    ghLink: "https://github.com/danvisai/Final_project_Backend/",
    description: "Canvas editing tool with generative workflows and creative tooling experiments.",
    tags: ["Graphics Programming"],
    timeline: "Add semester / year",
    stack: ["JavaScript", "Canvas/WebGL", "Backend API"],
    role: "Add your role here",
    details: [
      {
        heading: "Tool Concept",
        body: "Explain the editor workflow, target users, and the creation pipeline you designed.",
      },
      {
        heading: "Graphics / Rendering",
        body: "Add details on canvas rendering, compositing, brush systems, or visual processing techniques.",
      },
      {
        heading: "AI Integration",
        body: "Explain prompt flow, backend integration, latency handling, and UX choices.",
      },
    ],
  },
  {
    slug: "nft-marketplace",
    imgPath: marketplace,
    isBlog: false,
    title: "NFT Marketplace",
    description: "NFT marketplace that allows users to buy and sell NFTs.",
    ghLink: "https://github.com/danvisai/AgriCrop",
    demoLink: "https://www.youtube.com/watch?v=ZACIVqRDwdU",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Add semester / year",
    stack: ["Solidity", "Web3", "React"],
    role: "Add your role here",
    details: [
      {
        heading: "Marketplace Flow",
        body: "Document minting, listing, buying, and wallet connection UX.",
      },
      {
        heading: "Smart Contract Design",
        body: "Describe contract structure, access control, and transaction logic.",
      },
      {
        heading: "Security Considerations",
        body: "Note validation, threat model, and anything you learned about secure dApp development.",
      },
    ],
  },
  {
    slug: "automatic-question-paper-generator",
    imgPath: aqp,
    isBlog: false,
    title: "Automatic Question Paper Generator",
    description:
      "Automatic question paper generator made with JSP, Java, and CSS. Lets users create quizzes and attend them.",
    ghLink: "https://github.com/danvisai/QuestionPaperManagementSystem",
    demoLink: "https://github.com/danvisai/QuestionPaperManagementSystem",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Add semester / year",
    stack: ["Java", "JSP", "CSS"],
    role: "Add your role here",
    details: [
      {
        heading: "System Design",
        body: "Explain question bank management, quiz generation logic, and user roles.",
      },
      {
        heading: "Implementation",
        body: "Document backend/frontend flow, persistence, and validation.",
      },
      {
        heading: "Future Work",
        body: "Add ideas like adaptive difficulty, analytics, or moderation tooling.",
      },
    ],
  },
  {
    slug: "image-steganography",
    imgPath: ig,
    isBlog: false,
    title: "ImageSteganography",
    description:
      "Image steganography project made with Python and Flask. Hides messages inside images using cryptography and pixel manipulation techniques.",
    ghLink: "https://github.com/danvisai/ImageSteganography",
    demoLink: "",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Add semester / year",
    stack: ["Python", "Flask", "Image Processing"],
    role: "Add your role here",
    details: [
      {
        heading: "Problem + Approach",
        body: "Describe encoding/decoding flow and what steganography method you implemented.",
      },
      {
        heading: "Security Details",
        body: "Explain cryptography choices, threat assumptions, and limitations.",
      },
      {
        heading: "Evaluation",
        body: "Add image quality, hidden payload limits, and testing observations.",
      },
    ],
  },
  {
    slug: "crime-analysis",
    imgPath: ds,
    isBlog: false,
    title: "CrimeAnalysis",
    description:
      "A data science project made using Python to analyze crime rate data with visualization and filtering techniques.",
    ghLink: "https://github.com/danvisai/CrimeAnalysis",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Add semester / year",
    stack: ["Python", "Pandas", "Visualization"],
    role: "Add your role here",
    details: [
      {
        heading: "Dataset + Questions",
        body: "Describe the dataset and key analytical questions you set out to answer.",
      },
      {
        heading: "Analysis Pipeline",
        body: "Document cleaning, feature engineering, and visualization techniques.",
      },
      {
        heading: "Insights",
        body: "Summarize the most important findings and limitations.",
      },
    ],
  },
  {
    slug: "publication-computer-forensics",
    imgPath: pb,
    isBlog: false,
    title: "Publication",
    description: "Relevance of Computer Forensics in Security",
    ghLink: "https://github.com/danvisai/Publications",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Add publication date",
    stack: ["Research", "Computer Forensics", "Security"],
    role: "Author / Co-author (update)",
    details: [
      {
        heading: "Abstract",
        body: "Paste a short abstract or summary of the publication here.",
      },
      {
        heading: "Key Contributions",
        body: "List the ideas, framework, or arguments you contributed.",
      },
      {
        heading: "Publication Info",
        body: "Add venue, DOI/link, and citation format.",
      },
    ],
  },
  {
    slug: "apocalypse-overkill",
    imgPath: apo,
    isBlog: false,
    title: "Apocalypse Overkill",
    description: "Click on the demo to try it out.",
    ghLink: "https://github.com/danvisai/ApocalypseOverkill",
    demoLink: "https://apocalypse-overkill.vercel.app/",
    tags: ["Game Development", "Level Design"],
    timeline: "Add semester / year",
    stack: ["JavaScript", "Game Logic", "Web Deployment"],
    role: "Add your role here",
    details: [
      {
        heading: "Gameplay Loop",
        body: "Describe mechanics, progression, and player goals.",
      },
      {
        heading: "Level / Encounter Design",
        body: "Explain layout, pacing, and balancing decisions.",
      },
      {
        heading: "Tech Notes",
        body: "Document architecture, tools, and deployment considerations.",
      },
    ],
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((project) => project.slug === slug);
