import React, { useEffect, useMemo, useRef, useState } from "react";
import marioRunningSheet from "../Assets/mario_running.png";
import terrainBlock from "../Assets/terrain_block.png";
import pipeTexture from "../Assets/pipe.png";
import cloudLarge from "../Assets/cloud_large.avif";
import cloudMedium from "../Assets/cloud_medium.png";
import cloudSmiling from "../Assets/cloud_smiling.png";
import hillFar from "../Assets/hill_far.png";
import hillNear from "../Assets/hill_near.png";
import brickFillers from "../Assets/brick_fillers.png";
import blockFiller from "../Assets/block_filler.png";
import questionBlock from "../Assets/question_block.png";
import "./MarioPortfolio.css";

const WORLD_LENGTH = 5200;
const HERO_X = 220;
const FILLER_RULES = {
  xStart: 420,
  xEndPadding: 360,
  gapMin: 190,
  gapMax: 320,
  yMin: 230,
  yMax: 310,
  yStep: 12,
  blockChance: 0.22,
  avoidPipesRadius: 110,
  avoidStopRadius: 200,
  avoidQuestionRadius: 90,
};

const QUESTION_BLOCKS = [
  { key: "q-1", x: 1560, y: 248 },
  { key: "q-2", x: 3440, y: 268 },
];

const STOPS = [
  {
    key: "about-me",
    x: 560,
    w: 420,
    title: "About Me",
    subtitle: "Graphics Programmer | Game Developer",
    body: "I build interactive worlds where technology and creativity meet. As a graphics programmer and XR developer, I focus on real-time rendering, gameplay systems, and immersive environment design. I enjoy developing shaders, rendering pipelines, and gameplay mechanics that allow players to explore and interact with rich virtual spaces.\n\nFrom VR experiences to custom rendering systems, my work blends graphics programming, game development, and level design to create engaging digital environments that feel both visually compelling and technically robust.",
    tags: ["C++", "Realtime Rendering", "Engine Systems"],
  },
  {
    key: "skills-overview",
    x: 1360,
    w: 360,
    title: "Core Focus Areas",
    subtitle: "",
    body: "Graphics Programming\n\nGame Development\n\nVR / XR Development\n\nGame Engines & Tools\n\nProgramming Languages\n\nDesign & Collaboration",
    tags: ["All Skill Sets"],
  },
  {
    key: "contact-panel",
    x: 2200,
    w: 360,
    title: "Contact Me",
    subtitle: "Let’s Connect",
    body: "LinkedIn: linkedin.com/in/s-danvi-4856b8208",
    tags: ["Email", "LinkedIn"],
    isContactPanel: true,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seeded01(seed) {
  return Math.abs(Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1;
}

function MarioPortfolio() {
  const wrapperRef = useRef(null);
  const marioCanvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPreparingJump, setIsPreparingJump] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [tuning, setTuning] = useState({
    jumpHeight: 120,
    proximityStart: 36,
    proximityEnd: 60,
    frontOffset: 54,
    jumpDuration: 620,
  });
  const [cleanedTerrain, setCleanedTerrain] = useState(null);
  const [cleanedClouds, setCleanedClouds] = useState({
    smiling: cloudSmiling,
    medium: cloudMedium,
    large: cloudLarge,
  });

  const scrollStopTimerRef = useRef(0);
  const isScrollingRef = useRef(false);
  const isPreparingJumpRef = useRef(false);
  const isJumpingRef = useRef(false);
  const preJumpTimerRef = useRef(0);
  const jumpTimerRef = useRef(0);
  const triggeredPipesRef = useRef(new Set());

  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    isPreparingJumpRef.current = isPreparingJump;
  }, [isPreparingJump]);

  useEffect(() => {
    isJumpingRef.current = isJumping;
  }, [isJumping]);

  useEffect(
    () => () => {
      window.clearTimeout(preJumpTimerRef.current);
      window.clearTimeout(jumpTimerRef.current);
    },
    []
  );

  useEffect(() => {
    const updateProgress = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollable = Math.max(wrapperRef.current.offsetHeight - window.innerHeight, 1);
      const scrolled = clamp(-rect.top, 0, scrollable);
      setProgress(scrolled / scrollable);
      setViewportWidth(window.innerWidth);
      setIsScrolling(true);
      window.clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  const maxShift = Math.max(0, WORLD_LENGTH - viewportWidth + 200);
  const shiftX = progress * maxShift;
  const characterPulse = 1 + Math.sin(progress * 64) * 0.012;
  const skyShiftFar = -shiftX * 0.04;
  const skyShiftMid = -shiftX * 0.08;
  const skyShiftNear = -shiftX * 0.12;

  const cloudItems = useMemo(() => {
    const spritePool = [
      { src: cleanedClouds.smiling, scale: 1 },
      { src: cleanedClouds.medium, scale: 1.15 },
      { src: cleanedClouds.large, scale: 1.25 },
    ];
    const depthClasses = ["mario-cloud-depth-near", "mario-cloud-depth-mid", "mario-cloud-depth-far"];
    const items = [];
    const count = 8;

    for (let i = 0; i < count; i += 1) {
      const seed = Math.abs(Math.sin((i + 1) * 97.231) * 10000) % 1;
      const sprite = spritePool[i % spritePool.length];
      const depthClass = depthClasses[i % depthClasses.length];
      const width = Math.round((110 + seed * 130) * sprite.scale);
      const top = 6 + (seed * 26 + i * 3.7) % 42;
      const left = 2 + ((seed * 100 + i * 17.5) % 92);

      items.push({
        id: `cloud-${i}`,
        src: sprite.src,
        depthClass,
        style: {
          width: `${width}px`,
          height: `${Math.round(width * 0.55)}px`,
          top: `${top}%`,
          left: `${left}%`,
          opacity: 0.82 + ((1 - seed) * 0.18),
        },
      });
    }

    return items;
  }, [cleanedClouds]);

  const pipes = useMemo(
    () => [
      { x: 980, h: 82 },
      { x: 1880, h: 102 },
      { x: 2860, h: 86 },
      { x: 3790, h: 114 },
      { x: 4620, h: 92 },
    ],
    []
  );

  const updateTuning = (key, value) => {
    setTuning((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const updateContactForm = (key, value) => {
    setContactForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitContactForm = (event) => {
    event.preventDefault();
    const subject = `Portfolio Contact: ${contactForm.name || "New Message"}`;
    const body = [
      `Name: ${contactForm.name || "-"}`,
      `Email: ${contactForm.email || "-"}`,
      "",
      "Message:",
      contactForm.message || "-",
    ].join("\n");
    window.location.href = `mailto:danvisimhadri@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setIsContactModalOpen(false);
  };

  const fillerProps = useMemo(
    () => {
      const items = [];
      let x = FILLER_RULES.xStart;
      let index = 0;
      let previousType = "brick";

      const occupiedZones = [
        ...pipes.map((pipe) => pipe.x),
        ...STOPS.map((stop) => stop.x),
        ...QUESTION_BLOCKS.map((qb) => qb.x),
      ];
      const getZoneRadius = (zoneX) => {
        if (STOPS.some((stop) => stop.x === zoneX)) return FILLER_RULES.avoidStopRadius;
        if (QUESTION_BLOCKS.some((qb) => qb.x === zoneX)) return FILLER_RULES.avoidQuestionRadius;
        return FILLER_RULES.avoidPipesRadius;
      };

      while (x < WORLD_LENGTH - FILLER_RULES.xEndPadding) {
        const seed = seeded01(x + index * 41);
        const seed2 = seeded01(x * 0.71 + index * 13);
        const place = seed > 0.3;
        let tooCloseToZone = false;
        for (let i = 0; i < occupiedZones.length; i += 1) {
          const zoneX = occupiedZones[i];
          const radius = getZoneRadius(zoneX);
          if (Math.abs(x - zoneX) < radius) {
            tooCloseToZone = true;
            break;
          }
        }

        if (place && !tooCloseToZone) {
          let type = seed2 < FILLER_RULES.blockChance ? "block" : "brick";
          // Avoid long runs of the same prop type.
          if (type === previousType && seeded01(seed2 * 97) > 0.56) {
            type = type === "block" ? "brick" : "block";
          }
          previousType = type;

          const bandCount =
            Math.floor((FILLER_RULES.yMax - FILLER_RULES.yMin) / FILLER_RULES.yStep) + 1;
          const bandIndex = Math.floor(seeded01(seed * 133) * bandCount);
          const y = FILLER_RULES.yMin + bandIndex * FILLER_RULES.yStep;

          items.push({
            key: `filler-${index}`,
            x: Math.round(x),
            y,
            type,
          });
          index += 1;
        }

        x += FILLER_RULES.gapMin + Math.floor(seed2 * (FILLER_RULES.gapMax - FILLER_RULES.gapMin));
      }

      return items;
    },
    [pipes]
  );

  const nearHillItems = useMemo(
    () => [
      { key: "near-hill-1", left: "7%", width: 148, opacity: 0.78, groundOffset: -6 },
      { key: "near-hill-2", left: "27%", width: 196, opacity: 0.86, groundOffset: -4 },
      { key: "near-hill-3", left: "52%", width: 170, opacity: 0.8, groundOffset: -7 },
      { key: "near-hill-4", left: "74%", width: 214, opacity: 0.9, groundOffset: -5 },
    ],
    []
  );

  const farHillItems = useMemo(
    () => [
      { key: "far-hill-1", left: "2%", width: 268, opacity: 0.64, groundOffset: -2 },
      { key: "far-hill-2", left: "30%", width: 292, opacity: 0.7, groundOffset: -1 },
      { key: "far-hill-3", left: "57%", width: 286, opacity: 0.66, groundOffset: -3 },
      { key: "far-hill-4", left: "82%", width: 246, opacity: 0.62, groundOffset: -2 },
    ],
    []
  );

  const questionBlocks = QUESTION_BLOCKS;

  useEffect(() => {
    const heroWorldX = shiftX + HERO_X;
    const farDistance = Math.max(tuning.proximityStart, tuning.proximityEnd);
    const nearDistance = Math.min(tuning.proximityStart, tuning.proximityEnd);

    triggeredPipesRef.current.forEach((pipeX) => {
      if (heroWorldX < pipeX - 220 || heroWorldX > pipeX + 220) {
        triggeredPipesRef.current.delete(pipeX);
      }
    });

    if (!isScrolling || isPreparingJumpRef.current || isJumpingRef.current) return;

    const heroFrontX = heroWorldX + tuning.frontOffset;

    const nearbyPipe = pipes.find(
      (pipe) =>
        heroFrontX > pipe.x - farDistance &&
        heroFrontX < pipe.x - nearDistance &&
        !triggeredPipesRef.current.has(pipe.x)
    );

    if (!nearbyPipe) return;

    triggeredPipesRef.current.add(nearbyPipe.x);
    setIsPreparingJump(true);
    window.clearTimeout(preJumpTimerRef.current);
    window.clearTimeout(jumpTimerRef.current);
    preJumpTimerRef.current = window.setTimeout(() => {
      setIsPreparingJump(false);
      setIsJumping(true);
      jumpTimerRef.current = window.setTimeout(() => {
        setIsJumping(false);
      }, tuning.jumpDuration);
    }, 110);
  }, [shiftX, pipes, isScrolling, tuning]);

  useEffect(() => {
    let cancelled = false;

    const processTexture = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext("2d");
          if (!ctx) {
            resolve(src);
            return;
          }
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, c.width, c.height);
          const px = data.data;
          for (let i = 0; i < px.length; i += 4) {
            const r = px[i];
            const g = px[i + 1];
            const b = px[i + 2];
            const isMagenta = r > 235 && b > 235 && g < 100;
            const isNearBlack = r < 22 && g < 22 && b < 22;
            if (isMagenta || isNearBlack) {
              px[i + 3] = 0;
            }
          }
          ctx.putImageData(data, 0, 0);
          resolve(c.toDataURL("image/png"));
        };
        img.onerror = () => resolve(src);
      });

    const buildBrickTile = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const tileW = 56;
          const tileH = 56;
          const sx = Math.max(0, Math.floor(img.naturalWidth * 0.43));
          const sy = Math.max(0, Math.floor(img.naturalHeight * 0.58));
          const c = document.createElement("canvas");
          c.width = tileW;
          c.height = tileH;
          const ctx = c.getContext("2d");
          if (!ctx) {
            resolve(src);
            return;
          }
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, sx, sy, tileW, tileH, 0, 0, tileW, tileH);
          resolve(c.toDataURL("image/png"));
        };
        img.onerror = () => resolve(src);
      });

    const stripEdgeBackground = (src, tolerance = 46) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext("2d");
          if (!ctx) {
            resolve(src);
            return;
          }

          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, c.width, c.height);
          const data = imageData.data;
          const visited = new Uint8Array(c.width * c.height);

          const colorAt = (x, y) => {
            const i = (y * c.width + x) * 4;
            return [data[i], data[i + 1], data[i + 2], data[i + 3]];
          };

          const cornerColors = [
            colorAt(0, 0),
            colorAt(c.width - 1, 0),
            colorAt(0, c.height - 1),
            colorAt(c.width - 1, c.height - 1),
          ];

          const withinTolerance = (r, g, b) =>
            cornerColors.some(([cr, cg, cb]) => {
              const dr = r - cr;
              const dg = g - cg;
              const db = b - cb;
              return dr * dr + dg * dg + db * db <= tolerance * tolerance;
            });

          const queue = [
            [0, 0],
            [c.width - 1, 0],
            [0, c.height - 1],
            [c.width - 1, c.height - 1],
          ];

          while (queue.length) {
            const [x, y] = queue.pop();
            if (x < 0 || y < 0 || x >= c.width || y >= c.height) continue;

            const vIndex = y * c.width + x;
            if (visited[vIndex]) continue;
            visited[vIndex] = 1;

            const p = vIndex * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const a = data[p + 3];

            if (a === 0 || !withinTolerance(r, g, b)) continue;

            data[p + 3] = 0;

            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(c.toDataURL("image/png"));
        };
        img.onerror = () => resolve(src);
      });

    Promise.all([
      processTexture(terrainBlock),
      processTexture(pipeTexture),
    ]).then(async ([block, pipe]) => {
        const blockTile = await buildBrickTile(block);
        if (!cancelled) {
          setCleanedTerrain({ blockTile, pipe });
        }
      });

    Promise.all([
      stripEdgeBackground(cloudSmiling),
      stripEdgeBackground(cloudMedium),
      stripEdgeBackground(cloudLarge),
    ]).then(([smiling, medium, large]) => {
      if (!cancelled) {
        setCleanedClouds({ smiling, medium, large });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = marioCanvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const image = new Image();
    image.src = marioRunningSheet;

    const columns = 7;
    const frameW = Math.floor(762 / columns);
    const frameH = Math.floor(226 / 2);
    const frames = Array.from({ length: columns }, (_, index) => ({
      x: index * frameW,
      y: 0,
      w: frameW,
      h: frameH,
    }));

    let rafId = 0;
    let frameIndex = 0;
    let lastSwap = performance.now();
    const scale = 2;
    const runFrameOrder = [0, 1, 2, 1];
    const preJumpFrameIndex = 3;
    const jumpFrameIndex = 6;

    const renderFrame = (time) => {
      if (!ctx || !image.complete) {
        rafId = window.requestAnimationFrame(renderFrame);
        return;
      }

      if (isPreparingJumpRef.current) {
        frameIndex = 0;
      } else if (isJumpingRef.current) {
        frameIndex = 0;
      } else if (isScrollingRef.current) {
        if (time - lastSwap > 132) {
          frameIndex = (frameIndex + 1) % runFrameOrder.length;
          lastSwap = time;
        }
      } else {
        frameIndex = 0;
      }

      const frame = isPreparingJumpRef.current
        ? frames[Math.min(preJumpFrameIndex, frames.length - 1)]
        : isJumpingRef.current
          ? frames[Math.min(jumpFrameIndex, frames.length - 1)]
          : frames[runFrameOrder[frameIndex]];
      const temp = document.createElement("canvas");
      temp.width = frame.w;
      temp.height = frame.h;
      const tctx = temp.getContext("2d");
      if (tctx) {
        tctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);

        const imgData = tctx.getImageData(0, 0, frame.w, frame.h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 235 && b > 235 && g < 90) {
            data[i + 3] = 0;
          }
        }
        tctx.putImageData(imgData, 0, 0);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(temp, 0, 0, frame.w, frame.h, 0, 0, frame.w * scale, frame.h * scale);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    image.onload = () => {
      canvas.width = frameW * scale;
      canvas.height = frameH * scale;
      rafId = window.requestAnimationFrame(renderFrame);
    };

    if (image.complete && typeof image.onload === "function") {
      image.onload();
    }

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="mario-page"
      ref={wrapperRef}
      style={{
        ...(cleanedTerrain && {
          "--terrain-block-tile-texture": `url(${cleanedTerrain.blockTile})`,
          "--pipe-texture": `url(${cleanedTerrain.pipe})`,
        }),
        "--hill-far-texture": `url(${hillFar})`,
        "--hill-near-texture": `url(${hillNear})`,
        "--brick-filler-texture": `url(${brickFillers})`,
        "--block-filler-texture": `url(${blockFiller})`,
        "--question-block-texture": `url(${questionBlock})`,
        "--sky-shift-far": `${skyShiftFar}px`,
        "--sky-shift-mid": `${skyShiftMid}px`,
        "--sky-shift-near": `${skyShiftNear}px`,
      }}
    >
      <div className="mario-sticky-stage">
        <div className="mario-sky-layer">
          <div className="mario-sky-gradient" />
          <div className="mario-sky-haze mario-sky-haze-a" />
          <div className="mario-sky-haze mario-sky-haze-b" />
          {farHillItems.map((hill) => (
            <div
              key={hill.key}
              className="mario-far-hill"
              style={{
                left: hill.left,
                width: `${hill.width}px`,
                opacity: hill.opacity,
                "--far-hill-ground-offset": `${hill.groundOffset}px`,
              }}
            />
          ))}
          {nearHillItems.map((hill) => (
            <div
              key={hill.key}
              className="mario-near-hill"
              style={{
                left: hill.left,
                width: `${hill.width}px`,
                opacity: hill.opacity,
                "--near-hill-ground-offset": `${hill.groundOffset}px`,
              }}
            />
          ))}
          <div className="mario-sky-vignette" />
          {cloudItems.map((cloud) => (
            <img
              key={cloud.id}
              src={cloud.src}
              alt=""
              className={`mario-cloud ${cloud.depthClass}`}
              style={cloud.style}
            />
          ))}
        </div>

        <div className="mario-world-window">
          <div className="mario-world-track" style={{ transform: `translateX(-${shiftX}px)` }}>
            <div className="mario-ground" />

            {pipes.map((pipe) => (
              <div
                key={`pipe-${pipe.x}`}
                className="mario-pipe"
                style={{ left: `${pipe.x}px`, height: `${pipe.h}px` }}
              />
            ))}

            {fillerProps.map((prop) => (
              <div
                key={prop.key}
                className={`mario-filler-prop ${
                  prop.type === "brick" ? "mario-filler-brick" : "mario-filler-block"
                }`}
                style={{ left: `${prop.x}px`, bottom: `calc(28% + ${prop.y}px)` }}
              />
            ))}

            {questionBlocks.map((qb) => (
              <div
                key={qb.key}
                className="mario-question-block"
                style={{ left: `${qb.x}px`, bottom: `calc(28% + ${qb.y}px)` }}
              />
            ))}

            {STOPS.map((stop) => {
              const distanceToHero = Math.abs(stop.x - (shiftX + HERO_X));
              const isActive = distanceToHero < 280;
              return (
                <article
                  key={stop.key}
                  className={`mario-stop-card ${isActive ? "is-active" : ""}`}
                  style={{ left: `${stop.x}px`, width: `${stop.w}px` }}
                >
                  <div className="mario-stop-icon-slot">ICON</div>
                  <p className="mario-stop-label">{stop.subtitle}</p>
                  <h3>{stop.title}</h3>
                  <div className="mario-stop-body">
                    {stop.body.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    {stop.isContactPanel && (
                      <a
                        className="mario-stop-link"
                        href="https://www.linkedin.com/in/s-danvi-4856b8208"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="mario-stop-tags">
                    {stop.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {stop.isContactPanel && (
                    <button
                      type="button"
                      className="mario-stop-contact-btn"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Message Me
                    </button>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mario-character-shell">
            <div
              className={`mario-character ${
                isPreparingJump ? "is-pre-jump" : isJumping ? "is-jumping" : isScrolling ? "is-moving" : ""
              }`}
              style={{
                "--mario-scale": characterPulse,
                "--mario-jump-height": `${tuning.jumpHeight}px`,
              }}
              aria-hidden="true"
            >
              <canvas ref={marioCanvasRef} className="mario-sprite-canvas" />
            </div>
          </div>
        </div>

        <aside className="mario-tuning-panel" aria-label="Mario tuning controls">
          <h4>Jump Tuning</h4>
          <label>
            Jump Height: {tuning.jumpHeight}px
            <input
              type="range"
              min="60"
              max="160"
              step="1"
              value={tuning.jumpHeight}
              onChange={(e) => updateTuning("jumpHeight", e.target.value)}
            />
          </label>
          <label>
            Proximity Start: {tuning.proximityStart}px
            <input
              type="range"
              min="10"
              max="120"
              step="1"
              value={tuning.proximityStart}
              onChange={(e) => updateTuning("proximityStart", e.target.value)}
            />
          </label>
          <label>
            Proximity End: {tuning.proximityEnd}px
            <input
              type="range"
              min="20"
              max="140"
              step="1"
              value={tuning.proximityEnd}
              onChange={(e) => updateTuning("proximityEnd", e.target.value)}
            />
          </label>
          <label>
            Mario Front Offset: {tuning.frontOffset}px
            <input
              type="range"
              min="24"
              max="90"
              step="1"
              value={tuning.frontOffset}
              onChange={(e) => updateTuning("frontOffset", e.target.value)}
            />
          </label>
        </aside>
      </div>
      {isContactModalOpen && (
        <div
          className="mario-contact-modal-overlay"
          onClick={() => setIsContactModalOpen(false)}
          role="presentation"
        >
          <div
            className="mario-contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mario-contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mario-contact-close"
              onClick={() => setIsContactModalOpen(false)}
              aria-label="Close contact form"
            >
              x
            </button>
            <h2 id="mario-contact-modal-title">Send a Message</h2>
            <p>Share your details and project context. This opens a prefilled email draft.</p>
            <form className="mario-contact-form" onSubmit={submitContactForm}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={contactForm.name}
                onChange={(e) => updateContactForm("name", e.target.value)}
                placeholder="Your name"
                required
              />

              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => updateContactForm("email", e.target.value)}
                placeholder="you@example.com"
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows="5"
                value={contactForm.message}
                onChange={(e) => updateContactForm("message", e.target.value)}
                placeholder="Tell me about your role, team, and project."
                required
              />

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default MarioPortfolio;
