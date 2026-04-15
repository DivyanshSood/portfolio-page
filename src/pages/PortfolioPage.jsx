import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, MessageCircle, Mail, Shield, Zap, Code2 } from 'lucide-react';
import projects from '../data/projects';

/* Real screenshot via microlink */
const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;

function ProjectCard({ p, index }) {
  const imgRef  = useRef(null);
  const cardRef = useRef(null);
  const [imgOk, setImgOk]   = useState(true);
  const [loaded, setLoaded] = useState(false);
  const isEven = index % 2 === 0;

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
          <div className="pf-browser-bar">
            <div className="pf-dots">
              <span style={{ background: 'var(--brut-red)' }} />
              <span style={{ background: 'var(--brut-yellow)' }} />
              <span style={{ background: 'var(--brut-green)' }} />
            </div>
            <span className="pf-url mono">{hasSrc ? p.url.replace('https://', '') : 'launching soon'}</span>
          </div>

          <div className="pf-screen">
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
                    <span className="mono" style={{ color: 'var(--ink)', fontSize: '0.7rem', opacity: 0.7 }}>
                      loading preview…
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="pf-placeholder" style={{ background: p.grad }}>
                <div style={{ textAlign: 'center' }}>
                  <p className="mono" style={{ color: 'var(--ink)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    launching soon
                  </p>
                  <div style={{ width: 50, height: 3, background: 'var(--ink)', margin: '0 auto' }} />
                </div>
              </div>
            )}
            <div className="pf-screen-overlay" style={{ '--oc': p.c }} />
          </div>
        </div>
      </div>

      {/* ── Text side ── */}
      <div className="pf-text-col">
        <div className="pf-index-row">
          <span className="pf-index">0{index + 1}</span>
          <span className="pf-sector">{p.sector}</span>
          <span className="pf-sector" style={{ background: p.c, borderColor: 'var(--ink)' }}>{p.timeline}</span>
        </div>

        <h2 className="pf-hook">{p.hook}</h2>

        <span className="pf-name mono">
          <span style={{ width: 8, height: 8, background: p.c, border: '1.5px solid var(--ink)' }} />
          {p.url !== '#' ? p.url.replace('https://', '') : p.name}
        </span>

        <div className="pf-divider" style={{ background: p.c }} />

        <p className="pf-story body">{p.story}</p>

        {/* Metrics */}
        <div className="pf-metrics">
          {p.metrics.map((m) => (
            <div key={m.label} className="pf-metric">
              <div className="pf-metric-value">{m.value}</div>
              <div className="pf-metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div>
          <div className="pf-section-label">Stack</div>
          <div className="pf-stack">
            {p.stack.map((s) => (
              <span key={s} className="pf-chip">{s}</span>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div>
          <div className="pf-section-label">Scope delivered</div>
          <ul className="pf-scope">
            {p.scope.map((s) => (<li key={s}>{s}</li>))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="pf-cta-row">
          {p.url === '#' ? (
            <span className="btn-soft" style={{ opacity: 0.55, cursor: 'not-allowed' }}>
              LAUNCHING SOON
            </span>
          ) : (
            <a href={p.url} target="_blank" rel="noreferrer" className="btn">
              <ExternalLink size={13} /> SEE IT LIVE
            </a>
          )}
          <a href="https://wa.me/919816091875" target="_blank" rel="noreferrer" className="btn-soft">
            <MessageCircle size={13} /> BRIEF A SIMILAR BUILD
          </a>
        </div>
      </div>
    </article>
  );
}

const PILLARS = [
  { t: 'Frontend',    b: 'React · Next.js · TypeScript. Motion, 3D, and pixel-tight UI.' },
  { t: 'Backend',     b: 'Node · Postgres · Supabase. Auth, RBAC, APIs, automations.' },
  { t: 'Commerce',    b: 'Stripe · Shopify Storefront. Checkout, inventory, drops.' },
  { t: 'Performance', b: 'Core Web Vitals, SEO, <1s LCP, Lighthouse 95+.' },
];

const FAQS = [
  {
    q: 'What does "full stack" actually mean here?',
    a: 'You get one person across design, frontend, backend, database, payments, deploy, and post-launch. No agency handoffs, no "that\'s not my scope." Every site you see above was shipped end-to-end by me.',
  },
  {
    q: 'How long does a project take?',
    a: 'Landing pages 1–2 weeks. Full marketing sites 3–5 weeks. Full-stack products with auth/commerce/admin 6–10 weeks. You get a fixed timeline and a weekly build log — no silence.',
  },
  {
    q: 'Do you work with existing teams and codebases?',
    a: 'Yes. I\'ve taken over legacy WordPress and Shopify themes, shipped inside existing Next.js monorepos, and paired with in-house designers. Tell me the setup and I\'ll tell you honestly if I\'m the right fit.',
  },
  {
    q: 'What do you not do?',
    a: 'Mobile apps (iOS/Android native), native game dev, or crypto/token projects. If it\'s outside my lane I\'ll say so on the first call and point you to someone who lives there.',
  },
  {
    q: 'What happens after launch?',
    a: 'One month of bug fixes and small iterations free. After that, ongoing retainers start at a flat monthly rate — I keep your site fast, fix what breaks, and ship small improvements every week.',
  },
  {
    q: 'Pricing?',
    a: 'Scoped, fixed-price. No hourly. You see the number and the deliverables before a single line of code is written — and the number doesn\'t move unless the scope does.',
  },
];

const GUARANTEES = [
  { Ico: Shield, t: 'No-launch, no-pay', b: 'If the site doesn\'t hit the agreed spec on launch day, you don\'t pay the final instalment. Written into the contract.' },
  { Ico: Zap,    t: '< 1s load, guaranteed', b: 'Every site ships at Lighthouse 90+ on mobile. Not "we\'ll try" — written SLA. Miss it, I fix it on my time.' },
  { Ico: Code2,  t: 'You own everything', b: 'Full source on GitHub. No vendor lock-in, no proprietary builder. Hire anyone to maintain it — or keep me.' },
];

export default function PortfolioPage() {
  return (
    <div className="pf-page">
      {/* ── Hero ── */}
      <div className="pf-hero">
        <div className="pf-hero-grid">
          <div>
            <span className="label">Selected full-stack work</span>
            <h1 className="display" style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
              THINGS<br />
              <span style={{ color: 'var(--brut-pink)' }}>WE SHIPPED</span>.
            </h1>
            <p className="body" style={{ maxWidth: 560, fontSize: '1.02rem' }}>
              Five full-stack builds. Real briefs, real constraints, real P&amp;L impact.
              Every number below is from a live analytics dashboard — no lorem, no case-study theatre.
            </p>
          </div>
          <div className="pf-hero-meta">
            <div className="pf-hero-meta-row"><span>Role</span><strong>Full-stack · solo</strong></div>
            <div className="pf-hero-meta-row"><span>Stack</span><strong>Next.js · Postgres · Stripe</strong></div>
            <div className="pf-hero-meta-row"><span>Shipped</span><strong>5 products · 4 sectors</strong></div>
            <div className="pf-hero-meta-row"><span>Avg. timeline</span><strong>4–9 weeks</strong></div>
            <div className="pf-hero-meta-row"><span>Based</span><strong>Himachal · remote</strong></div>
          </div>
        </div>
      </div>

      {/* ── Capability pillars ── */}
      <div className="pf-pillars">
        {PILLARS.map(({ t, b }) => (
          <div key={t} className="pf-pillar">
            <div className="pf-pillar-title">{t}</div>
            <div className="pf-pillar-body">{b}</div>
          </div>
        ))}
      </div>

      {/* ── Project case studies ── */}
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} index={i} />
      ))}

      {/* ── Process band ── */}
      <div className="pf-process-band">
        <h3>How a project actually runs.</h3>
        <p className="sub">No agency ceremony. No three-week "discovery phase" invoice. Here&rsquo;s the whole thing.</p>
        <div className="pf-process-grid">
          <div className="pf-process-step">
            <span className="num">01</span>
            <h4>Brief call</h4>
            <p>30 min. You talk, I listen, I push back where needed. You leave with a written scope + number — free.</p>
          </div>
          <div className="pf-process-step">
            <span className="num">02</span>
            <h4>Design in code</h4>
            <p>No Figma theatre. I design directly in React on a preview URL. You see real UI by day 3, not week 3.</p>
          </div>
          <div className="pf-process-step">
            <span className="num">03</span>
            <h4>Build + weekly log</h4>
            <p>Every week: Loom walkthrough, deployed preview, open questions. You&rsquo;re never guessing what I&rsquo;m doing.</p>
          </div>
          <div className="pf-process-step">
            <span className="num">04</span>
            <h4>Launch + 30 days</h4>
            <p>Go live on your domain. 30 days of iterations included. After that: optional retainer or clean handover.</p>
          </div>
        </div>
      </div>

      {/* ── Guarantees ── */}
      <div className="pf-guarantees">
        {GUARANTEES.map(({ Ico, t, b }) => (
          <div key={t} className="pf-guarantee">
            <div className="ico"><Ico size={18} strokeWidth={2.5} /></div>
            <div>
              <h5>{t}</h5>
              <p>{b}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FAQ ── */}
      <div className="pf-faq">
        <div>
          <h3 className="pf-faq-head">Questions clients actually ask.</h3>
          <p className="pf-faq-sub">
            No sales fluff. If your question isn&rsquo;t here, WhatsApp me — I answer inside a working day.
          </p>
        </div>
        <div className="pf-faq-list">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="pf-faq-item">
              <h5>{q}</h5>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer CTA ── */}
      <div className="pf-footer">
        <p className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Want results like these?
        </p>
        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}>
          LET&rsquo;S BUILD<br />
          <span style={{ color: 'var(--brut-pink)' }}>YOUR THING.</span>
        </h2>
        <div className="pf-footer-cta-row">
          <a href="https://wa.me/919816091875" target="_blank" rel="noreferrer" className="btn">
            <MessageCircle size={14} /> WHATSAPP ME
          </a>
          <a href="mailto:divyansh@example.com" className="btn-soft">
            <Mail size={14} /> EMAIL BRIEF
          </a>
        </div>
      </div>
    </div>
  );
}
