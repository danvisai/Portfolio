import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import { DESIGN_PROCESS, CASE_STUDIES, DESIGN_CODA } from "./designData";

function Figure({ img, className = "" }) {
  return (
    <figure className={`ds-figure ${className}`.trim()}>
      <div className="ds-figure-frame">
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
        <div className="ds-block rv">
          <h3>{block.heading}</h3>
          <p>{block.body}</p>
        </div>
      );
    case "figures":
      if (block.images.length === 1) {
        return <Figure img={block.images[0]} className="rv" />;
      }
      return (
        <div className={`ds-figrow cols-${block.images.length} rv-group`}>
          {block.images.map((img) => (
            <Figure key={img.src} img={img} />
          ))}
        </div>
      );
    case "quotes":
      return (
        <div className="ds-block rv-group">
          {block.items.map((quote) => (
            <blockquote className="ds-quote" key={quote.text}>
              <p>“{quote.text}”</p>
              <span>{quote.attribution}</span>
            </blockquote>
          ))}
        </div>
      );
    case "points":
      return (
        <div className="ds-block ds-block-wide">
          <h3 className="rv">{block.heading}</h3>
          <div className="ds-points rv-group">
            {block.items.map((point) => (
              <div className="ds-point" key={point.title}>
                <h4>{point.title}</h4>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "recs":
      return (
        <div className="ds-block">
          <h3 className="rv">{block.heading}</h3>
          <ul className="ds-recs rv-group">
            {block.items.map((rec) => (
              <li className="ds-rec" key={rec}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      );
    case "loop":
      return (
        <div className="ds-block ds-block-wide">
          <h3 className="rv">{block.heading}</h3>
          <div className="ds-loop rv-group">
            {block.steps.map((step) => (
              <div className="ds-loop-step" key={step.label}>
                <strong>{step.label}</strong>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "persona":
      return (
        <div className="ds-persona rv">
          <img src={block.image.src} alt={block.image.alt} />
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
    const targets = document.querySelectorAll(".rv, .rv-group, .ds-cover");

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
              <div className="ds-cover">
                <div
                  className="ds-cover-img"
                  style={{ backgroundImage: `url(${study.hero.src})` }}
                  role="img"
                  aria-label={study.hero.alt}
                />
                <div className="ds-cover-content">
                  <span className="ds-cover-num" aria-hidden="true">
                    {study.id}
                  </span>
                  <p className="ds-cover-kicker">{study.kicker}</p>
                  <h2 className="ds-cover-title">{study.title}</h2>
                  {study.hero.caption && (
                    <p className="ds-cover-caption">{study.hero.caption}</p>
                  )}
                  <span className="ds-scroll-cue" aria-hidden="true">
                    ▼ scroll into the study
                  </span>
                </div>
              </div>

              <div className="ds-study-body">
                <p className="ds-summary rv">{study.summary}</p>

                <div className="ds-meta rv">
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

                <div className="ds-stats rv-group">
                  {study.stats.map((stat) => (
                    <div className="ds-stat" key={stat.label}>
                      <span className="ds-stat-value">{stat.value}</span>
                      <span className="ds-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {study.blocks.map((block, index) => (
                  <StudyBlock block={block} key={`${study.anchor}-${index}`} />
                ))}

                <div className="ds-takeaway rv">
                  <strong>Takeaway</strong>
                  <p>{study.takeaway}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="ds-coda rv">
          <img src={DESIGN_CODA.image.src} alt={DESIGN_CODA.image.alt} />
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
