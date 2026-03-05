import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const MAX_DEPTH = 4200;

const DEPTH_SECTIONS = [
  { id: "hero", z: 0 },
  { id: "about", z: -950 },
  { id: "projects", z: -1950 },
  { id: "breakdown", z: -3050 },
  { id: "contact", z: -3950 },
];

const PROJECTS = [
  {
    title: "Clustered Deferred Renderer",
    summary:
      "Physically based lighting pipeline with clustered light culling and temporal anti-aliasing.",
    tags: ["PBR", "Deferred Rendering", "GPU Culling"],
  },
  {
    title: "Volumetric Atmosphere Lab",
    summary:
      "Single-scattering atmospheric model with signed distance field cloud volumes and blue-noise integration.",
    tags: ["Ray Marching", "Volumetrics", "GLSL"],
  },
  {
    title: "Compute Terrain Synthesis",
    summary:
      "Procedural terrain generation and erosion simulation accelerated through asynchronous compute passes.",
    tags: ["Compute Shaders", "Noise", "LOD"],
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function DepthBackgroundScene({ depthProgress }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f14);
    scene.fog = new THREE.Fog(0x0b0f14, 16, 160);

    const camera = new THREE.PerspectiveCamera(
      57,
      mount.clientWidth / mount.clientHeight || 16 / 9,
      0.1,
      420
    );
    camera.position.set(0, 2.1, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    mount.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xa5bfd4, 0x0a0b10, 0.74);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xd3dfec, 1.1);
    keyLight.position.set(8, 14, 12);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x80b2d8, 0.8, 34, 2);
    rimLight.position.set(0, 3.4, 4);
    scene.add(rimLight);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x10151d,
      roughness: 0.95,
      metalness: 0.04,
      emissive: 0x04070c,
      emissiveIntensity: 0.5,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(110, 280), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.26;
    scene.add(floor);

    const grid = new THREE.GridHelper(110, 88, 0x3d566b, 0x243646);
    grid.position.y = -1.22;
    const mats = Array.isArray(grid.material) ? grid.material : [grid.material];
    mats.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.24;
    });
    scene.add(grid);

    const laneMaterial = new THREE.MeshBasicMaterial({
      color: 0x7396b5,
      transparent: true,
      opacity: 0.18,
    });
    const laneGeometry = new THREE.BoxGeometry(0.06, 0.01, 250);
    const laneOffsets = [-3.6, 0, 3.6];
    laneOffsets.forEach((x) => {
      const lane = new THREE.Mesh(laneGeometry, laneMaterial);
      lane.position.set(x, -1.18, -95);
      scene.add(lane);
    });

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    const blockGeo = new THREE.BoxGeometry(1, 1, 1);
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x1a232e,
      roughness: 0.8,
      metalness: 0.15,
      emissive: 0x0a1118,
      emissiveIntensity: 0.45,
    });
    const stripMat = new THREE.MeshBasicMaterial({
      color: 0x9fc6e6,
      transparent: true,
      opacity: 0.12,
    });

    for (let i = 0; i < 96; i += 1) {
      const z = 24 - i * 2.25;
      const leftX = -8.8 - (i % 3) * 0.7;
      const rightX = 8.8 + (i % 4) * 0.62;
      const leftHeight = 2.4 + (i % 7) * 0.62;
      const rightHeight = 2.2 + ((i + 2) % 6) * 0.66;

      const left = new THREE.Mesh(blockGeo, blockMat);
      left.position.set(leftX, leftHeight / 2 - 1.2, z);
      left.scale.set(2.4, leftHeight, 1.9 + (i % 2) * 0.4);
      structureGroup.add(left);

      const right = new THREE.Mesh(blockGeo, blockMat);
      right.position.set(rightX, rightHeight / 2 - 1.2, z - 0.4);
      right.scale.set(2.3, rightHeight, 1.7 + (i % 3) * 0.35);
      structureGroup.add(right);

      if (i % 2 === 0) {
        const leftStrip = new THREE.Mesh(blockGeo, stripMat);
        leftStrip.position.set(leftX + 0.94, leftHeight - 1.3, z + 0.1);
        leftStrip.scale.set(0.05, Math.max(leftHeight * 0.65, 0.8), 2.1);
        structureGroup.add(leftStrip);

        const rightStrip = new THREE.Mesh(blockGeo, stripMat);
        rightStrip.position.set(rightX - 0.95, rightHeight - 1.24, z - 0.2);
        rightStrip.scale.set(0.05, Math.max(rightHeight * 0.65, 0.8), 1.9);
        structureGroup.add(rightStrip);
      }
    }

    const markerGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0xb7d3eb,
      transparent: true,
      opacity: 0.34,
    });
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);
    for (let i = 0; i < 140; i += 1) {
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(
        (Math.random() - 0.5) * 32,
        Math.random() * 10 - 2,
        -Math.random() * 220 + 10
      );
      markerGroup.add(marker);
    }

    const clock = new THREE.Clock();

    const handleResize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    let rafId = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      const normalized = clamp(depthProgress.current / MAX_DEPTH, 0, 1);
      const travelZ = 28 - normalized * 118;

      camera.position.z = travelZ;
      camera.position.x = Math.sin(normalized * Math.PI * 2.2) * 0.65;
      camera.position.y = 2.05 + Math.sin(normalized * Math.PI * 3) * 0.08;
      camera.lookAt(
        camera.position.x * 0.28,
        0.72 + Math.sin(t * 0.4) * 0.03,
        travelZ - 20
      );

      markerGroup.rotation.y = normalized * 0.34;
      grid.position.z = -90 + normalized * 16;
      rimLight.position.z = camera.position.z + 16;
      rimLight.position.x = camera.position.x * 0.7;
      laneMaterial.opacity = 0.16 + normalized * 0.07;

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(render);
    };

    handleResize();
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      floor.geometry.dispose();
      floorMaterial.dispose();
      laneGeometry.dispose();
      laneMaterial.dispose();
      blockGeo.dispose();
      blockMat.dispose();
      stripMat.dispose();
      markerGeo.dispose();
      markerMat.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [depthProgress]);

  return <div className="depth-engine-canvas" ref={mountRef} aria-hidden="true" />;
}

function DepthPortfolioExperience() {
  const [depth, setDepth] = useState(0);
  const [targetDepth, setTargetDepth] = useState(0);
  const sceneRef = useRef(null);
  const rafRef = useRef(0);
  const depthProgress = useRef(0);
  const touchY = useRef(0);
  const touchStartY = useRef(0);
  const stageIndexRef = useRef(0);
  const stageLockRef = useRef(false);
  const lockTimeoutRef = useRef(0);
  const wheelForwardSignRef = useRef(null);

  const stageDepths = useMemo(() => DEPTH_SECTIONS.map((section) => -section.z), []);

  const stepStage = useCallback(
    (direction) => {
      if (stageLockRef.current) return;
      const nextIndex = clamp(
        stageIndexRef.current + direction,
        0,
        stageDepths.length - 1
      );
      if (nextIndex === stageIndexRef.current) return;
      stageIndexRef.current = nextIndex;
      stageLockRef.current = true;
      window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = window.setTimeout(() => {
        stageLockRef.current = false;
      }, 1200);
      setTargetDepth(stageDepths[nextIndex]);
    },
    [stageDepths]
  );

  useEffect(() => {
    const onWheel = (event) => {
      event.preventDefault();
      if (stageLockRef.current) return;
      if (Math.abs(event.deltaY) < 4) return;
      const rawSign = event.deltaY > 0 ? 1 : -1;
      if (wheelForwardSignRef.current === null && stageIndexRef.current === 0) {
        // Calibrate forward direction per input device so first downward gesture moves deeper.
        wheelForwardSignRef.current = rawSign;
      }
      const forwardSign = wheelForwardSignRef.current ?? 1;
      const direction = rawSign === forwardSign ? 1 : -1;
      stepStage(direction);
    };

    const onTouchStart = (event) => {
      const startY = event.touches[0].clientY;
      touchStartY.current = startY;
      touchY.current = startY;
    };

    const onTouchMove = (event) => {
      touchY.current = event.touches[0].clientY;
    };

    const onTouchEnd = () => {
      if (stageLockRef.current) return;
      const delta = touchStartY.current - touchY.current;
      if (Math.abs(delta) < 28) return;
      const direction = delta > 0 ? 1 : -1;
      stepStage(direction);
    };

    const onKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        stepStage(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        stepStage(-1);
      }
    };

    const element = sceneRef.current;
    if (!element) return undefined;
    window.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stageDepths, stepStage]);

  useEffect(() => {
    const tick = () => {
      setDepth((prev) => {
        const smoothed = prev + (targetDepth - prev) * 0.11;
        const snapped = Math.abs(targetDepth - smoothed) < 0.3 ? targetDepth : smoothed;
        if (stageLockRef.current && Math.abs(targetDepth - snapped) < 4) {
          stageLockRef.current = false;
          window.clearTimeout(lockTimeoutRef.current);
        }
        depthProgress.current = snapped;
        return snapped;
      });
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(lockTimeoutRef.current);
    };
  }, [targetDepth]);

  const normalizedDepth = depth / MAX_DEPTH;

  const sectionStyles = useMemo(() => {
    const revealRange = 520;
    const hardHideRange = 900;

    return DEPTH_SECTIONS.reduce((acc, section) => {
      const effectiveZ = section.z + depth;
      const distance = Math.abs(effectiveZ);
      const near = clamp(1 - distance / 1200, 0, 1);
      const proximity = clamp(1 - distance / revealRange, 0, 1);
      const isVisible = distance < hardHideRange;

      acc[section.id] = {
        transform: `translate(-50%, -50%) translateZ(${section.z}px) scale(${(0.92 + near * 0.08).toFixed(3)})`,
        opacity: isVisible ? clamp(proximity, 0, 1) : 0,
        filter: `blur(${((1 - proximity) * 1.25).toFixed(2)}px)`,
        pointerEvents: proximity > 0.6 ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
      };
      return acc;
    }, {});
  }, [depth]);

  return (
    <section className="depth-scene" ref={sceneRef}>
      <DepthBackgroundScene depthProgress={depthProgress} />

      <div className="depth-overlay" aria-hidden="true">
        <div className="depth-overlay-top">
          <span>Renderer Initialized</span>
          <span>Real-Time Pipeline Active</span>
          <span>Depth: {Math.round(depth)}u</span>
        </div>
        <div className="depth-overlay-bottom">
          <span>Scroll drives camera travel on Z-axis</span>
          <span>Scene layers occupy physical depth volumes</span>
        </div>
      </div>

      <div className="depth-world" style={{ transform: `translateZ(${depth}px)` }}>
        <article className="depth-layer depth-hero-layer" style={sectionStyles.hero}>
          <p className="depth-label">Graphics Systems Portfolio</p>
          <h1>DANVI SAI</h1>
          <h2>Graphics Programmer | Game Developer</h2>
          <p className="depth-copy">
            Building rendering architecture, performance-focused gameplay systems,
            and technical pipelines across realtime engines.
          </p>
          <div className="depth-status-row">
            <span>Frame Graph: Online</span>
            <span>Shading Path: Deferred + Compute</span>
          </div>
        </article>

        <article className="depth-layer depth-about-layer" style={sectionStyles.about}>
          <div className="depth-panel depth-panel-main">
            <p className="depth-label">About / Technical Profile</p>
            <h3>Rendering Systems + Engine Architecture</h3>
            <p>
              I design and implement realtime rendering features, shader workflows,
              and performance tooling for interactive experiences. My focus is
              technically robust visuals with production-aware constraints.
            </p>
            <p>
              Current interests include GPU-driven pipelines, physically based
              lighting, and scalable scene management for cross-platform deployment.
            </p>
          </div>
          <aside className="depth-panel depth-panel-side">
            <h4>Languages</h4>
            <p>C++ • HLSL • GLSL</p>
            <h4>APIs</h4>
            <p>Vulkan • DirectX • OpenGL</p>
            <h4>Tools</h4>
            <p>Unreal • Unity • RenderDoc • PIX</p>
          </aside>
        </article>

        <article className="depth-layer depth-projects-layer" style={sectionStyles.projects}>
          <p className="depth-label">Projects / Mid Depth Zone</p>
          <h3>Technical Work</h3>
          <div className="depth-project-grid">
            {PROJECTS.map((project) => (
              <div key={project.title} className="depth-project-card">
                <div className="depth-project-thumb" />
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <div className="depth-tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="depth-layer depth-breakdown-layer" style={sectionStyles.breakdown}>
          <p className="depth-label">Featured Technical Breakdown</p>
          <div className="depth-breakdown-layout">
            <div className="depth-breakdown-render">
              <div className="depth-breakdown-grid" />
              <span>Featured Render / Pipeline View</span>
            </div>
            <div className="depth-breakdown-meta">
              <h3>Frame Pipeline Report</h3>
              <ul>
                <li>Geometry Pass + GBuffer Composition</li>
                <li>Screen-Space Reflections + Volumetric Fog</li>
                <li>GPU Profiling + Async Compute Scheduling</li>
              </ul>
              <div className="depth-metrics">
                <div>
                  <small>FPS</small>
                  <strong>120</strong>
                </div>
                <div>
                  <small>Platform</small>
                  <strong>PC</strong>
                </div>
                <div>
                  <small>Tools</small>
                  <strong>RenderDoc</strong>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="depth-layer depth-contact-layer" style={sectionStyles.contact}>
          <p className="depth-label">Contact / Deep Layer</p>
          <h3>Let&apos;s Build Something Technical</h3>
          <p>Available for graphics engineering, rendering R&D, and gameplay systems roles.</p>
          <a className="depth-mail-btn" href="mailto:danvi@example.com">
            <FiMail /> danvi@example.com
          </a>
          <div className="depth-socials">
            <a href="https://github.com/danvisai" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/s-danvi-4856b8208"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
          </div>
          <span className="depth-cursor">_</span>
        </article>
      </div>

      <div className="depth-progress-rail" aria-hidden="true">
        <span style={{ transform: `scaleY(${clamp(normalizedDepth, 0.03, 1)})` }} />
      </div>
    </section>
  );
}

export default DepthPortfolioExperience;
