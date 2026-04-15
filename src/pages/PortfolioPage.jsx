import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import projects from '../data/projects';

/* Real screenshot via microlink — works as a plain <img> src */
const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;

function ProjectCard({ p, index }) {
  const imgRef  = useRef(null);
  const cardRef = useRef(null);
  const [imgOk, setImgOk]   = useState(true);
  const [loaded, setLoaded] = useState(false);
  const isEven = index % 2 === 0;

  /* Fade-in on scroll */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('pf-visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hasSrc = p.url !== '#';

  return (
    <article
      ref={cardRef}
      className={`pf-entry ${isEven ? 'pf-even' : 'pf-odd'}`}
    >
      {/* ── Screenshot side ── */}
      <div className="pf-img-col">
        <div className="pf-browser">
          {/* Browser chrome */}
          <div className="pf-browser-bar">
            <div className="pf-dots">
              <span className="dot-r" />
              <span className="dot-a" />
              <span className="dot-g" />
            </div>
            <span className="pf-url mono">{hasSrc ? p.url.replace('https://', '') : 'coming-soon'}</span>
          </div>

          {/* Screenshot / placeholder */}
          <div className="pf-screen" style={{ borderColor: p.c + '22' }}>
            {hasSrc && imgOk ? (
              <>
                <img
                  ref={imgRef}
                  src={screenshotUrl(p.url)}
                  alt={p.name}
                  className={`pf-screenshot ${loaded ? 'pf-img-loaded' : ''}`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setImgOk(false)}
                />
                {!loaded && (
                  <div className="pf-loading" style={{ background: p.grad }}>
                    <span className="mono" style={{ color: p.c, fontSize: '0.7rem', opacity: 0.6 }}>
                      loading preview…
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Fallback / "coming soon" */
              <div className="pf-placeholder" style={{ background: p.grad }}>
                <div style={{ textAlign: 'center' }}>
                  <p className="mono" style={{ color: p.c, fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                    {hasSrc ? p.url.replace('https://', '') : 'launching soon'}
                  </p>
                  <div style={{ width: 60, height: 3, background: p.c, borderRadius: 2, margin: '0 auto', opacity: 0.4 }} />
                </div>
              </div>
            )}

            {/* Color tint overlay on hover */}
            <div className="pf-screen-overlay" style={{ '--oc': p.c }} />
          </div>
        </div>
      </div>

      {/* ── Text side ── */}
      <div className="pf-text-col">
        <span className="pf-index mono" style={{ color: p.c }}>0{index + 1}</span>

        <h2 className="pf-hook">{p.hook}</h2>

        <p className="pf-name mono" style={{ color: p.c }}>
          {p.url !== '#' ? p.url.replace('https://', '') : p.name}
        </p>

        <div className="pf-divider" style={{ background: p.c }} />

        <p className="pf-story body">{p.story}</p>

        <div style={{ marginTop: '2rem' }}>
          {p.url === '#' ? (
            <span
              className="btn"
              style={{ opacity: 0.35, cursor: 'not-allowed', borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }}
            >
              LAUNCHING SOON
            </span>
          ) : (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="btn"
              style={{ borderColor: p.c, color: p.c }}
            >
              <ExternalLink size={13} /> SEE IT LIVE
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <div className="pf-page">
      {/* ── Hero header ── */}
      <div className="pf-hero">
        <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-orange)', marginBottom: '0.75rem' }}>
          selected work
        </p>
        <h1 className="display" style={{ color: 'var(--text)', textAlign: 'center', lineHeight: 1, marginBottom: '1.25rem' }}>
          THINGS<br />
          <span style={{ color: 'var(--neon-green)' }}>WE SHIPPED.</span>
        </h1>
        <p className="body" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', opacity: 0.6 }}>
          Five projects. Real constraints. Zero lorem ipsum. Built to perform, measured to prove it.
        </p>
      </div>

      {/* ── Project entries ── */}
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} index={i} />
      ))}

      {/* ── Footer nudge ── */}
      <div className="pf-footer">
        <p className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Want results like these?
        </p>
        <p className="display" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', textAlign: 'center', color: 'var(--neon-green)' }}>
          LET'S TALK.
        </p>
      </div>
    </div>
  );
}
