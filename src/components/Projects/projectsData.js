import ds from "../../Assets/Projects/ds.png";
import ig from "../../Assets/Projects/ig.png";
import marketplace from "../../Assets/Projects/marketplace.png";
import pb from "../../Assets/Projects/pb.png";
import aqp from "../../Assets/Projects/aqp.png";
import apo from "../../Assets/Projects/apo.png";
import spa from "../../Assets/Projects/spa.png";
import gce from "../../Assets/Projects/gce.png";
import ge from "../../Assets/Projects/ge.jpg";
import vlScene from "../../Assets/Projects/Graphics_Programming_Images/VolumetricLighting_HG/Scene.png";
import vlSceneFog from "../../Assets/Projects/Graphics_Programming_Images/VolumetricLighting_HG/SceneWithFog.png";
import vlPhase from "../../Assets/Projects/Graphics_Programming_Images/VolumetricLighting_HG/VolumetricPhase.png";
import vlFogRoof from "../../Assets/Projects/Graphics_Programming_Images/VolumetricLighting_HG/FogWithRoofView.png";
import vlScatteringRoof from "../../Assets/Projects/Graphics_Programming_Images/VolumetricLighting_HG/ScatteringOfRoofView.png";
import edgeBlur from "../../Assets/Projects/Graphics_Programming_Images/Edge/Edge_Blur.png";
import edgeNegative from "../../Assets/Projects/Graphics_Programming_Images/Edge/Edge_Negative.png";
import edgeWhite from "../../Assets/Projects/Graphics_Programming_Images/Edge/Edge_White.png";
import pbr1 from "../../Assets/Projects/Graphics_Programming_Images/Pbr/1.png";
import pbr2 from "../../Assets/Projects/Graphics_Programming_Images/Pbr/2.png";
import pbr3 from "../../Assets/Projects/Graphics_Programming_Images/Pbr/3.png";
import pbr4 from "../../Assets/Projects/Graphics_Programming_Images/Pbr/4.png";
import pbrVideo from "../../Assets/Projects/Graphics_Programming_Images/Pbr/capture.mp4";

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
      "A specialized VR game built in Unity3D that uses sensory-friendly design, spatial organization challenges, and interactive tasks to promote cognitive engagement for individuals with autism.",
    demoLink: "https://www.youtube.com/watch?v=dRMw0R8pNFA",
    tags: ["VR", "Game Development", "Level Design"],
    timeline: "Spring 2024",
    stack: ["Unity", "C#", "XR Interaction Toolkit"],
    role: "VR Developer & Designer",
    details: [
      {
        heading: "Overview",
        body: "This project explores how VR can serve as a therapeutic and educational tool for individuals with autism spectrum disorder. The game presents players with spatial arrangement challenges in a calm, sensory-friendly environment — encouraging cognitive engagement without overwhelming stimulation. Tasks involve organizing objects by shape, color, and position within a structured 3D space.",
      },
      {
        heading: "Design & Interaction Systems",
        body: "Built using Unity's XR Interaction Toolkit, the game features grab-and-place mechanics, haptic feedback for correct placements, and adaptive difficulty that adjusts based on player performance. Sensory design choices include muted color palettes, optional ambient audio, and visual cues that avoid flashing or high-contrast transitions. Scene layout was iterated on through feedback sessions to minimize cognitive load.",
      },
      {
        heading: "Results",
        body: "The demo was well-received for its accessibility focus and intuitive interaction design. Spatial reasoning tasks proved engaging across different ability levels, and the sensory-first approach demonstrated that VR environments can be designed to be inclusive without sacrificing interactivity. The project reinforced best practices around XR accessibility and the value of user-centered design in immersive applications.",
      },
    ],
  },
  {
    slug: "game-engine",
    imgPath: ge,
    isBlog: false,
    title: "Game Engine",
    ghLink: "",
    description: "A custom game engine built from scratch in C++ and OpenGL, featuring an Entity Component System architecture, a forward rendering pipeline, and real-time scene management.",
    tags: ["Graphics Programming", "Game Development"],
    timeline: "Fall 2023",
    stack: ["C++", "OpenGL", "ECS", "GLSL"],
    role: "Engine Developer",
    details: [
      {
        heading: "Engine Architecture",
        body: "The engine is built around an Entity Component System (ECS) pattern, separating data (components) from logic (systems) to maximize cache efficiency and flexibility. Core subsystems include a scene manager, an asset loader for textures and meshes, an input handler, and a component registry. Entities are lightweight integer IDs, and components are stored in contiguous memory arrays for fast iteration.",
      },
      {
        heading: "Rendering Pipeline",
        body: "The rendering system uses a forward rendering pass with per-object draw calls dispatched from the render system. GLSL shaders handle vertex transformation, normal mapping, and Phong-based lighting. The pipeline supports multiple light types (directional, point, spot) and a basic material system with diffuse and specular parameters. Shader hot-reloading was implemented to speed up iteration during development.",
      },
      {
        heading: "Challenges & Learnings",
        body: "Designing a clean abstraction layer between the ECS and the OpenGL renderer required careful thought about ownership and data flow. Managing GPU state changes efficiently — minimizing redundant bind calls and texture switches — was a key performance consideration. Building this engine from scratch gave deep insight into how commercial engines manage complexity, and reinforced the value of data-oriented design for real-time systems.",
      },
    ],
  },
  {
    slug: "volumetric-lighting-hg",
    imgPath: vlSceneFog,
    isBlog: false,
    title: "Volumetric Lighting (Henyey-Greenstein)",
    description:
      "Real-time volumetric lighting and fog using the Henyey-Greenstein phase function — implementing raymarched light scattering through participating media with artist-tunable controls.",
    demoLink: "https://youtu.be/RXg0pCpP4Ug",
    tags: ["Graphics Programming"],
    timeline: "Fall 2023",
    stack: ["C++", "OpenGL", "GLSL", "Rendering"],
    role: "Graphics Programmer",
    details: [
      {
        heading: "Goal",
        body: "The project aimed to simulate how light physically behaves when passing through fog, smoke, or haze — a class of effects known as participating media. The visual target was cinematic volumetric shafts and atmospheric scattering, implemented in real time without deferred or path-tracing infrastructure.",
      },
      {
        heading: "Implementation",
        body: "The core technique is raymarching through a volumetric density field in screen space. At each step along a view ray, incoming light is evaluated using the Henyey-Greenstein phase function, which models anisotropic scattering — forward-biased for fog, backward-biased for dusty air. Shadow map sampling at each raymarch step determines whether a point is in shadow. Scattering accumulates over the ray until it exits the volume. Artist controls for density, scattering coefficient (g), and absorption were exposed as uniforms.",
      },
      {
        heading: "Results",
        body: "The implementation produced convincing god rays and atmospheric depth even with a modest step count, thanks to jittered sampling and temporal stability techniques. Comparing the scene with and without the effect highlighted how much volumetric scattering contributes to the perception of depth and mood. Performance remained interactive at 1080p with 64 march steps, with further gains possible through half-resolution accumulation.",
      },
    ],
    gallery: [
      { src: vlScene, alt: "Base scene without fog" },
      { src: vlSceneFog, alt: "Scene with volumetric fog applied" },
      { src: vlPhase, alt: "Volumetric phase function visualization" },
      { src: vlFogRoof, alt: "Fog effect with overhead roof view" },
      { src: vlScatteringRoof, alt: "Light scattering with roof view" },
    ],
  },
  {
    slug: "edge-detection-filters",
    imgPath: edgeWhite,
    isBlog: false,
    title: "Edge Detection Filters",
    description:
      "A post-processing study implementing real-time edge detection, blur, and negative filters as full-screen GLSL shader passes — exploring convolution kernels and their visual effects on rendered scenes.",
    tags: ["Graphics Programming"],
    timeline: "Fall 2023",
    stack: ["C++", "OpenGL", "GLSL", "Image Processing"],
    role: "Graphics Programmer",
    details: [
      {
        heading: "Goal",
        body: "The goal was to implement classic image processing filters as real-time GPU shader passes and understand how spatial convolution kernels affect visual output. Edge detection is a fundamental operation in both classical computer vision and stylized rendering, and implementing it in GLSL demonstrated how these operations translate to the fragment shader stage.",
      },
      {
        heading: "Implementation",
        body: "Three filter passes were implemented as full-screen quad effects using framebuffer objects. The edge detection pass uses a Sobel operator — two 3×3 kernels sampling the surrounding texels to approximate the horizontal and vertical intensity gradient. The gradient magnitude is computed per fragment to produce crisp outlines. A Gaussian blur pass was implemented for smooth pre-processing, and a negative filter simply inverts the RGB channels. All filters are composited as post-process passes on the rendered scene.",
      },
      {
        heading: "Results",
        body: "The Sobel edge filter produced clean outlines that could be blended with the original render for a stylized toon-like look. Applying the blur before edge detection reduced noise and produced smoother contours. The negative filter, while simple, highlighted how much the perception of a scene shifts with an inverted palette. The exercise built a solid foundation for more advanced post-processing such as SSAO, bloom, and depth-of-field.",
      },
    ],
    gallery: [
      { src: edgeWhite, alt: "Edge detection — white outline mode" },
      { src: edgeBlur, alt: "Edge detection with blur pre-processing" },
      { src: edgeNegative, alt: "Negative filter applied to scene" },
    ],
  },
  {
    slug: "physically-based-lighting",
    imgPath: pbr1,
    isBlog: false,
    title: "Physically Based Lighting Models",
    description:
      "Implementation of physically based rendering (PBR) — Cook-Torrance microfacet BRDF with GGX normal distribution, Smith geometry function, and Fresnel-Schlick approximation for energy-conserving shading across metallic and dielectric materials.",
    tags: ["Graphics Programming"],
    timeline: "Spring 2024",
    stack: ["C++", "OpenGL", "GLSL", "PBR"],
    role: "Graphics Programmer",
    details: [
      {
        heading: "Overview",
        body: "Physically based rendering aims to simulate how light interacts with surfaces based on real-world material properties rather than ad hoc shading models. This project implements a full PBR pipeline — covering diffuse and specular BRDFs, energy conservation, and real-world material parameters (roughness and metallic) that give artists intuitive controls with physically plausible results.",
      },
      {
        heading: "Implementation",
        body: "The BRDF is based on the Cook-Torrance microfacet model. The normal distribution function uses GGX (Trowbridge-Reitz), which produces a sharper specular highlight with a realistic long tail compared to Blinn-Phong. The geometry term uses Smith's method with the Schlick-GGX approximation to model self-shadowing between microfacets. The Fresnel term uses Schlick's approximation, with F0 derived from the metallic parameter to blend between dielectric (fixed 0.04) and metallic (albedo-tinted) base reflectance. The result is energy-conserving shading that looks correct under a range of lighting conditions.",
      },
      {
        heading: "Results",
        body: "Across the test suite — from rough matte surfaces to mirror-polished metals — the PBR model produced convincing material responses. Metallic surfaces correctly tinted their specular highlight with the albedo color, while dielectrics maintained a consistent white specular. Varying roughness produced smooth, physically plausible specular lobe falloffs. The project reinforced how much of visual quality comes from getting the energy balance right rather than adding complexity.",
      },
    ],
    gallery: [
      { src: pbr1, alt: "PBR render — full material overview" },
      { src: pbr2, alt: "PBR render — metallic materials" },
      { src: pbr3, alt: "PBR render — roughness variation" },
      { src: pbr4, alt: "PBR render — lighting comparison" },
    ],
    video: pbrVideo,
  },
  {
    slug: "generative-ai-canvas-editor",
    imgPath: gce,
    isBlog: false,
    title: "Generative AI Canvas Editor",
    ghLink: "https://github.com/danvisai/Final_project_Backend/",
    description: "A web-based canvas editor that integrates generative AI to assist creative workflows — allowing users to compose, modify, and generate visual content through an interactive editing interface backed by an AI API.",
    tags: ["Graphics Programming"],
    timeline: "Spring 2024",
    stack: ["JavaScript", "HTML5 Canvas", "Node.js", "REST API"],
    role: "Full Stack Developer",
    details: [
      {
        heading: "Concept & Workflow",
        body: "The editor combines a traditional canvas-based drawing interface with AI-powered generation — letting users sketch, select regions, and trigger generative fills or stylistic transformations. The core idea was to make generative AI feel like a native brush tool rather than a separate pipeline step, lowering the barrier to creative experimentation. Users can layer manual edits on top of generated content seamlessly.",
      },
      {
        heading: "Canvas & Rendering",
        body: "The frontend is built on the HTML5 Canvas API, with a layered rendering model that separates user strokes, AI-generated content, and compositing overlays. Selection masking, undo/redo history, and export functionality are handled client-side. Drawing operations are batched into commands to support non-destructive editing and efficient re-renders on change.",
      },
      {
        heading: "AI Integration & Backend",
        body: "The backend, written in Node.js, acts as a proxy between the canvas frontend and the generative AI API — handling prompt construction, image encoding, and response streaming. Canvas regions selected by the user are encoded as base64 and sent as image context for inpainting or style-transfer operations. Latency is managed through optimistic UI updates and a loading state overlay, keeping the creative flow uninterrupted while generation runs.",
      },
    ],
  },
  {
    slug: "nft-marketplace",
    imgPath: marketplace,
    isBlog: false,
    title: "NFT Marketplace",
    description: "A decentralized NFT marketplace built on the Ethereum blockchain — enabling users to mint, list, buy, and sell NFTs through a React frontend connected to Solidity smart contracts via Web3.",
    ghLink: "https://github.com/danvisai/AgriCrop",
    demoLink: "https://www.youtube.com/watch?v=ZACIVqRDwdU",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Spring 2023",
    stack: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    role: "Blockchain Developer",
    details: [
      {
        heading: "Marketplace Flow",
        body: "The platform supports the full NFT lifecycle: artists can mint new tokens by uploading metadata (image + description) which is stored on IPFS and referenced on-chain. Minted tokens can be listed at a fixed price, and buyers connect their MetaMask wallet to purchase with ETH. Ownership transfers are handled atomically by the smart contract, and a user dashboard displays owned and listed tokens.",
      },
      {
        heading: "Smart Contract Design",
        body: "The core contract is an ERC-721 implementation extended with a marketplace layer. It tracks listings (token ID, price, seller), handles ETH escrow during transactions, and emits events for minting and sales. A platform fee mechanism was implemented to deduct a small percentage on each sale. Careful attention was paid to reentrancy guards and access control to ensure only token owners can list or delist their NFTs.",
      },
      {
        heading: "Security Considerations",
        body: "Key security practices included using OpenZeppelin's audited ERC-721 base, applying the checks-effects-interactions pattern to prevent reentrancy, and validating all price and ownership conditions before state changes. The project reinforced the critical difference between client-side validation and on-chain enforcement — any business logic that matters must live in the contract, not the frontend.",
      },
    ],
  },
  {
    slug: "automatic-question-paper-generator",
    imgPath: aqp,
    isBlog: false,
    title: "Automatic Question Paper Generator",
    description:
      "A web application built with Java and JSP that enables educators to create and manage question banks, automatically generate randomized question papers, and allow students to take timed quizzes online.",
    ghLink: "https://github.com/danvisai/QuestionPaperManagementSystem",
    demoLink: "https://github.com/danvisai/QuestionPaperManagementSystem",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Fall 2022",
    stack: ["Java", "JSP", "Servlets", "MySQL", "CSS"],
    role: "Full Stack Developer",
    details: [
      {
        heading: "System Design",
        body: "The system separates two user roles — educators and students. Educators can create subjects, add questions with difficulty tags and multiple-choice options, and configure paper parameters (total marks, time limit, question count per difficulty tier). The generator selects questions randomly from the bank while respecting the configured distribution, ensuring no two generated papers are identical.",
      },
      {
        heading: "Implementation",
        body: "Built on a Java Servlet + JSP stack with a MySQL backend for persistent storage of users, questions, and results. Session management handles authentication and quiz state — tracking the current question, elapsed time, and answer submissions. A countdown timer on the frontend auto-submits the quiz when time expires, with server-side validation ensuring answers cannot be submitted after the deadline. Results are stored and viewable by educators.",
      },
      {
        heading: "Outcomes & Future Work",
        body: "The system successfully automated what was previously a manual paper-setting process, with randomization ensuring academic integrity across multiple quiz attempts. Potential extensions include adaptive difficulty (adjusting question selection based on past performance), analytics dashboards for educators to identify commonly missed topics, and support for non-MCQ question types such as short answers.",
      },
    ],
  },
  {
    slug: "image-steganography",
    imgPath: ig,
    isBlog: false,
    title: "Image Steganography",
    description:
      "A steganography tool built with Python and Flask that conceals encrypted text messages inside image files using least-significant-bit (LSB) pixel manipulation — enabling covert data hiding undetectable to the naked eye.",
    ghLink: "https://github.com/danvisai/ImageSteganography",
    demoLink: "",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Spring 2023",
    stack: ["Python", "Flask", "Pillow", "Cryptography", "NumPy"],
    role: "Developer",
    details: [
      {
        heading: "Approach",
        body: "The application hides a text message within an image by overwriting the least significant bit of each color channel (R, G, B) per pixel with the bits of the encoded message. Since the LSB contributes only 1/255 of each channel's intensity, the visual change is imperceptible to the human eye. A header is embedded at the start of the pixel stream to record the message length, enabling clean extraction later.",
      },
      {
        heading: "Encryption & Security",
        body: "Before embedding, the message is encrypted using a symmetric cipher (AES via the Python cryptography library), adding a layer of confidentiality on top of the obscurity of steganography. This means that even if an adversary knows steganography was used and extracts the bit stream, the content remains unreadable without the key. The Flask web interface allows users to upload an image, enter a message and passphrase, and download the stego image — or upload a stego image and passphrase to decode.",
      },
      {
        heading: "Evaluation",
        body: "Testing across PNG and lossless formats confirmed reliable encode/decode cycles with no data loss. The payload capacity scales with image resolution — a 1920×1080 image can hide approximately 750 KB of data. JPEG was intentionally unsupported as lossy compression destroys LSB data. The project demonstrated how thin the line is between imperceptible change and detectable artifact, and reinforced the importance of pairing steganography with encryption for real security.",
      },
    ],
  },
  {
    slug: "crime-analysis",
    imgPath: ds,
    isBlog: false,
    title: "Crime Analysis",
    description:
      "A data science project that analyzes publicly available crime rate datasets using Python, uncovering trends, geographic distributions, and temporal patterns through statistical analysis and interactive visualizations.",
    ghLink: "https://github.com/danvisai/CrimeAnalysis",
    tags: ["Cyber Security / Blockchain"],
    timeline: "Fall 2022",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "NumPy"],
    role: "Data Analyst",
    details: [
      {
        heading: "Dataset & Questions",
        body: "The analysis uses publicly available crime incident data containing records categorized by crime type, location, date, and time of day. Key analytical questions driving the project: Which crime categories are most prevalent? Are there temporal patterns — by hour, day, or month? Are certain areas disproportionately affected? How have overall crime rates trended over time? These questions shaped the cleaning strategy and visualization choices.",
      },
      {
        heading: "Analysis Pipeline",
        body: "Raw data was loaded into Pandas and cleaned — handling null values, standardizing category labels, and parsing timestamps into structured datetime objects. Feature engineering extracted hour-of-day, day-of-week, and month columns to enable temporal segmentation. Groupby aggregations and pivot tables were used to compute category distributions and trend lines. Visualizations were built with Matplotlib and Seaborn, including heatmaps for time-of-day vs. day-of-week density, bar charts for category frequency, and line plots for year-over-year trend.",
      },
      {
        heading: "Insights",
        body: "The analysis revealed clear temporal clustering — incidents peaked in evening hours on weekends for certain crime types, while property crimes showed daytime distribution patterns consistent with occupancy-driven opportunity. Geographic hotspots were identifiable from coordinate data, suggesting resource allocation implications. The project demonstrated how raw tabular data, with careful cleaning and segmentation, can surface actionable patterns that are invisible in raw form.",
      },
    ],
  },
  {
    slug: "publication-computer-forensics",
    imgPath: pb,
    isBlog: false,
    title: "Publication — Computer Forensics",
    description: "A research publication examining the growing relevance of computer forensics in modern cybersecurity — covering investigative methodologies, digital evidence standards, and the role of forensic analysis in incident response.",
    ghLink: "https://github.com/danvisai/Publications",
    tags: ["Cyber Security / Blockchain"],
    timeline: "2023",
    stack: ["Research", "Computer Forensics", "Cybersecurity"],
    role: "Author",
    details: [
      {
        heading: "Abstract",
        body: "As cyber threats grow in sophistication and frequency, computer forensics has become a critical discipline at the intersection of law, security, and technology. This publication examines how forensic methodologies — evidence acquisition, chain of custody, volatile memory analysis, and file system examination — apply to contemporary incident response and legal proceedings. It argues that forensic readiness must be treated as a first-class security concern, not an afterthought.",
      },
      {
        heading: "Key Contributions",
        body: "The paper surveys core forensic techniques including disk imaging, log analysis, network traffic reconstruction, and malware artifact recovery. It discusses how the shift toward cloud infrastructure and encrypted communications challenges traditional forensic workflows, and proposes a framework for adapting forensic procedures to hybrid and cloud-native environments. The paper also addresses the evidentiary standards required for forensic findings to hold up in legal contexts.",
      },
      {
        heading: "Publication Info",
        body: "Published in 2023. Full reference and citation details available via the GitHub repository link. The work draws on established forensic frameworks (NIST SP 800-86, RFC 3227) and recent literature on cloud forensics and anti-forensic countermeasures.",
      },
    ],
  },
  {
    slug: "apocalypse-overkill",
    imgPath: apo,
    isBlog: false,
    title: "Apocalypse Overkill",
    description: "A browser-based wave survival game where players defend against escalating enemy hordes — featuring hand-crafted level design, real-time collision, and progressively tuned encounter pacing.",
    ghLink: "https://github.com/danvisai/ApocalypseOverkill",
    demoLink: "https://apocalypse-overkill.vercel.app/",
    tags: ["Game Development", "Level Design"],
    timeline: "Summer 2023",
    stack: ["JavaScript", "HTML5 Canvas", "CSS", "Vercel"],
    role: "Game Developer & Designer",
    details: [
      {
        heading: "Gameplay Loop",
        body: "Players face continuous waves of enemies that increase in count and speed with each round. The core loop is built around positioning, resource management, and split-second decisions under pressure. Weapons have limited ammo that must be managed across waves, and power-ups spawn at intervals to reward aggressive play. The escalating difficulty curve was tuned through repeated playtesting to maintain tension without becoming unfair.",
      },
      {
        heading: "Level & Encounter Design",
        body: "The environment is a constrained arena with choke points and open flanks, forcing players to balance defensive positioning against the need to collect pickups. Enemy spawn locations rotate around the arena perimeter to prevent the player from camping a single corner. Wave composition mixes fast low-health enemies with slower tanky ones — requiring players to prioritize targets. Difficulty parameters (spawn rate, enemy health multiplier, speed scale) are driven by a wave formula that produces smooth progression.",
      },
      {
        heading: "Technical Notes",
        body: "The game is built entirely in vanilla JavaScript on an HTML5 Canvas, with a simple game loop driven by requestAnimationFrame. A lightweight entity manager handles spawning, collision detection (AABB), and despawning. All assets are drawn programmatically or sourced as sprites, keeping the bundle size minimal. The project is deployed on Vercel as a static site — playable directly in browser with no install required.",
      },
    ],
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((project) => project.slug === slug);
