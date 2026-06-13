import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as THREE from "three";
import Particle from "../Particle";
import { DESIGN_PROCESS, CASE_STUDIES, DESIGN_CODA } from "./designData";

function CaseFileOpenScene() {
  const mountRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const stage = stageRef.current;
    if (!mount || !stage) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.24;
    root.rotation.z = -0.035;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    keyLight.position.set(-3, 5, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9fd9ff, 0.75);
    fillLight.position.set(4, 2, 4);
    scene.add(fillLight);

    const folderMat = new THREE.MeshStandardMaterial({
      color: 0xf1c44c,
      roughness: 0.72,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    const folderDarkMat = new THREE.MeshStandardMaterial({
      color: 0xd9a53a,
      roughness: 0.78,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xf8fbfd,
      roughness: 0.86,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    const paperBlueMat = new THREE.MeshStandardMaterial({
      color: 0xe6f2f6,
      roughness: 0.86,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xd95d39,
      roughness: 0.65,
      metalness: 0.02,
    });
    const tealMat = new THREE.MeshStandardMaterial({
      color: 0x2a8b86,
      roughness: 0.66,
      metalness: 0.02,
    });

    const makePlane = (w, h, mat) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      return mesh;
    };

    const base = makePlane(6.4, 3.8, folderMat);
    base.position.z = -0.06;
    root.add(base);

    const tab = makePlane(1.72, 0.48, folderDarkMat);
    tab.position.set(-2.05, 1.92, -0.04);
    root.add(tab);

    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(6.45, 0.08, 0.08),
      folderDarkMat
    );
    spine.position.set(0, 1.9, 0.06);
    root.add(spine);

    const coverPivot = new THREE.Group();
    coverPivot.position.set(0, 1.88, 0.08);
    root.add(coverPivot);

    const cover = makePlane(6.4, 3.78, folderMat);
    cover.position.y = -1.89;
    cover.position.z = 0.01;
    coverPivot.add(cover);

    const coverLabel = makePlane(1.85, 0.52, paperMat);
    coverLabel.position.set(-1.82, -1.22, 0.035);
    coverPivot.add(coverLabel);

    const papers = [];
    const paperSpecs = [
      [-1.05, -0.18, 0.02, -0.09, paperMat],
      [0.42, -0.32, 0.055, 0.08, paperBlueMat],
      [1.18, 0.2, 0.09, -0.03, paperMat],
    ];

    paperSpecs.forEach(([x, y, z, rz, mat], index) => {
      const paper = makePlane(2.55, 2.05, mat);
      paper.position.set(x, y, z);
      paper.rotation.z = rz;
      paper.userData.home = { x, y, z, rz };
      papers.push(paper);
      root.add(paper);

      for (let row = 0; row < 4; row += 1) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(1.55 - row * 0.16, 0.025, 0.012),
          row % 2 === 0 ? tealMat : accentMat
        );
        line.position.set(
          -0.24,
          0.54 - row * 0.28,
          0.03 + index * 0.004
        );
        paper.add(line);
      }
    });

    const cards = [];
    [
      [-2.2, -1.08, -0.16, accentMat],
      [-0.65, -1.35, 0.1, tealMat],
      [1.04, -1.12, -0.05, folderDarkMat],
      [2.42, -0.92, 0.17, accentMat],
    ].forEach(([x, y, rz, mat], index) => {
      const card = makePlane(1.08, 0.72, paperMat);
      card.position.set(x, y, 0.18 + index * 0.015);
      card.rotation.z = rz;
      card.userData.home = { x, y, z: card.position.z, rz };
      root.add(card);
      cards.push(card);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.045, 0.018), mat);
      stripe.position.set(0, 0.18, 0.03);
      card.add(stripe);
      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.09, 24), mat);
      dot.position.set(-0.32, -0.12, 0.035);
      card.add(dot);
    });

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 4.2),
      new THREE.MeshBasicMaterial({
        color: 0x162c3d,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })
    );
    shadow.position.set(0.08, -0.1, -0.16);
    root.add(shadow);

    const easeOut = (value) => 1 - Math.pow(1 - value, 3);
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    let sceneProgress = reduceMotion ? 1 : 0;
    let targetProgress = reduceMotion ? 1 : 0;
    let rafId = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.position.set(0, 2.1, clientWidth < 640 ? 8.6 : 7.25);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const updateTargetProgress = () => {
      if (reduceMotion) {
        targetProgress = 1;
        return;
      }

      const rect = stage.getBoundingClientRect();
      const scrollableDistance = Math.max(
        rect.height - window.innerHeight * 0.72,
        1
      );
      targetProgress = clamp(
        (window.innerHeight * 0.16 - rect.top) / scrollableDistance,
        0,
        1
      );
    };

    const renderFrame = () => {
      sceneProgress += (targetProgress - sceneProgress) * 0.11;
      const open = easeOut(sceneProgress);
      const drop = easeOut(clamp((sceneProgress - 0.34) / 0.66, 0, 1));
      const time = performance.now() * 0.001;

      root.rotation.z = -0.035 + Math.sin(time * 0.5) * 0.006;
      coverPivot.rotation.x = -open * 2.35;
      coverPivot.rotation.z = -open * 0.08;
      coverPivot.position.z = 0.08 + open * 0.16;
      cover.material.opacity = 0.98 - open * 0.08;
      cover.material.transparent = true;

      papers.forEach((paper, index) => {
        const home = paper.userData.home;
        const spread = index - 1;
        paper.visible = drop > 0.02;
        paper.scale.setScalar(0.52 + drop * 0.48);
        paper.position.x = home.x + spread * 0.5 * drop;
        paper.position.y = home.y - 0.78 * (1 - drop) - index * 0.05;
        paper.position.z = -0.03 + home.z + 0.42 * drop + Math.sin(time + index) * 0.01;
        paper.rotation.x = (1 - drop) * 1.22;
        paper.rotation.z = home.rz + spread * 0.09 * drop;
      });

      cards.forEach((card, index) => {
        const home = card.userData.home;
        const scatter = index % 2 === 0 ? -1 : 1;
        card.visible = drop > 0.16;
        card.scale.setScalar(0.45 + drop * 0.55);
        card.position.x = home.x + scatter * 0.62 * drop;
        card.position.y = home.y - (1 - drop) * (0.9 + index * 0.12);
        card.position.z = -0.02 + home.z + drop * 0.55;
        card.rotation.x = (1 - drop) * 1.35;
        card.rotation.z = home.rz + scatter * 0.09 * drop;
      });

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderFrame);
    };

    resize();
    updateTargetProgress();
    renderFrame();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateTargetProgress, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateTargetProgress);
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
      });
      renderer.dispose();
      [
        folderMat,
        folderDarkMat,
        paperMat,
        paperBlueMat,
        accentMat,
        tealMat,
        shadow.material,
      ].forEach((mat) => mat.dispose());
    };
  }, []);

  return (
    <div className="ds-three-case-stage" ref={stageRef} aria-hidden="true">
      <div className="ds-three-case">
        <div className="ds-three-case-canvas" ref={mountRef} />
      </div>
    </div>
  );
}

function ImageCard({ img }) {
  return (
    <figure className="ds-card ds-img-card">
      <div className="ds-img-thumb">
        <img src={img.src} alt={img.alt} loading="lazy" />
      </div>
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
}

function StudyBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="ds-card ds-text-card rv">
          <h3>{block.heading}</h3>
          <p>{block.body}</p>
        </div>
      );
    case "figures":
      return (
        <div className={`ds-cardgrid cols-${block.images.length} rv-group`}>
          {block.images.map((img) => (
            <ImageCard key={img.src} img={img} />
          ))}
        </div>
      );
    case "quotes":
      return (
        <div className="ds-cardgrid cols-2 rv-group">
          {block.items.map((quote) => (
            <blockquote className="ds-card ds-quote-card" key={quote.text}>
              <p>“{quote.text}”</p>
              <span>{quote.attribution}</span>
            </blockquote>
          ))}
        </div>
      );
    case "points":
      return (
        <>
          <h3 className="ds-block-h rv">{block.heading}</h3>
          <div className="ds-cardgrid cols-2 rv-group">
            {block.items.map((point) => (
              <div className="ds-card ds-point-card" key={point.title}>
                <h4>{point.title}</h4>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
        </>
      );
    case "recs":
      return (
        <>
          <h3 className="ds-block-h rv">{block.heading}</h3>
          <div className="ds-cardgrid cols-3 rv-group">
            {block.items.map((rec, index) => (
              <div className="ds-card ds-rec-card" key={rec}>
                <span className="ds-rec-num">{index + 1}</span>
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </>
      );
    case "loop":
      return (
        <>
          <h3 className="ds-block-h rv">{block.heading}</h3>
          <div className="ds-cardgrid cols-4 rv-group">
            {block.steps.map((step) => (
              <div className="ds-card ds-loop-card" key={step.label}>
                <strong>{step.label}</strong>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </>
      );
    case "persona":
      return (
        <div className="ds-card ds-persona-card rv">
          <img src={block.image.src} alt={block.image.alt} loading="lazy" />
          <div>
            <h4>{block.name}</h4>
            <p>{block.body}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function Design() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const targets = document.querySelectorAll(".rv, .rv-group");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToStudy = (event, anchor) => {
    event.preventDefault();
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${anchor}`);
    }
  };

  return (
    <Container fluid className="project-section design-section">
      <Particle />
      <Container>
        <header className="ds-hero">
          <span className="ds-kicker">UI/UX · GAMES USER RESEARCH</span>
          <h1>
            I design with <strong>players in the room.</strong>
          </h1>
          <p className="ds-lede">
            Games user researcher and developer. I watch people play, listen to
            what they say, check it against what they actually do — then build
            the fix. Six case studies, from accessible VR to live-service
            engagement to graphics pipelines.
          </p>
          <nav className="ds-index" aria-label="Case study index">
            {CASE_STUDIES.map((study) => (
              <a
                key={study.anchor}
                href={`#${study.anchor}`}
                onClick={(event) => scrollToStudy(event, study.anchor)}
              >
                <span>{study.id}</span>
                {study.title}
              </a>
            ))}
          </nav>
        </header>

        <CaseFileOpenScene />

        <div className="ds-process rv-group" aria-label="My design process">
          {DESIGN_PROCESS.map((item, index) => (
            <div className="ds-process-step" key={item.step}>
              <span className="ds-process-num">{index + 1}</span>
              <h3>{item.step}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="ds-studies">
          {CASE_STUDIES.map((study) => (
            <section className="ds-study" id={study.anchor} key={study.anchor}>
              <span className="ds-folder-tab">Case file {study.id}</span>
              <div className="ds-intro rv">
                <span className="ds-study-num" aria-hidden="true">
                  {study.id}
                </span>
                <p className="ds-study-kicker">{study.kicker}</p>
                <h2 className="ds-study-title">{study.title}</h2>
              </div>

              <div className="ds-card ds-lead-card rv">
                <div className="ds-lead-media">
                  <img
                    src={study.hero.src}
                    alt={study.hero.alt}
                    loading="lazy"
                  />
                </div>
                <div className="ds-lead-body">
                  <p className="ds-summary">{study.summary}</p>
                  <div className="ds-meta">
                    <div className="ds-meta-item">
                      <strong>Role</strong>
                      {study.meta.role}
                    </div>
                    <div className="ds-meta-item">
                      <strong>Scope</strong>
                      {study.meta.scope}
                    </div>
                    <div className="ds-meta-item">
                      <strong>Methods</strong>
                      {study.meta.methods}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ds-cardgrid cols-3 rv-group">
                {study.stats.map((stat) => (
                  <div className="ds-card ds-stat-card" key={stat.label}>
                    <span className="ds-stat-value">{stat.value}</span>
                    <span className="ds-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {study.blocks.map((block, index) => (
                <StudyBlock block={block} key={`${study.anchor}-${index}`} />
              ))}

              <div className="ds-card ds-takeaway-card rv">
                <strong>Takeaway</strong>
                <p>{study.takeaway}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="ds-card ds-coda-card rv">
          <div className="ds-coda-media">
            <img src={DESIGN_CODA.image.src} alt={DESIGN_CODA.image.alt} />
          </div>
          <div>
            <p className="ds-study-kicker">{DESIGN_CODA.kicker}</p>
            <h2>{DESIGN_CODA.title}</h2>
            <p>{DESIGN_CODA.body}</p>
          </div>
        </div>

        <div className="ds-cta rv">
          <h2>Want the full reports?</h2>
          <p>
            Every study above has complete documentation — study plans, raw
            observations, and annotated findings. Happy to walk through any of
            them.
          </p>
          <Link to="/resume">View my resume</Link>
        </div>
      </Container>
    </Container>
  );
}

export default Design;
