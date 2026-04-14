import React from 'react';
import { Terminal, MapPin } from 'lucide-react';
import Panel from '../components/Panel';

const About = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <Terminal size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-green)' }}>about_me</p>
        <h2 className="heading" style={{ margin: 0 }}>The Developer Behind the Work</h2>
      </div>
    </div>
    <p className="body-loud" style={{ marginBottom: '1rem' }}>
      I'm Divyansh Sood — a full-stack developer and designer based in India. I take projects from blank canvas
      to live product: design, code, infrastructure, and deploy.
    </p>
    <p className="body" style={{ marginBottom: '2rem' }}>
      I've shipped for schools, e-commerce stores, and fashion labels. Each project is built to a specific business
      outcome — faster load times, higher enquiry volume, more revenue — not just a better-looking page.
    </p>
    <div className="about-location">
      <MapPin size={13} style={{ color: 'var(--neon-green)' }} />
      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>India · Available for remote projects worldwide</span>
    </div>
    <div className="stats-grid" style={{ marginTop: '1.75rem' }}>
      {[
        { num: '3+', label: 'Years Building', c: 'var(--neon-green)', tip: 'The average developer rewrites their personal site every 18 months.' },
        { num: '10+', label: 'Projects Shipped', c: 'var(--neon-cyan)', tip: 'The first website went live August 6, 1991. It had no images, no CSS, no JS.' },
        { num: '100%', label: 'Client Satisfaction', c: 'var(--neon-purple)', tip: '96% of a first impression is design-driven. 4% is everything else.' },
      ].map((s, i) => (
        <div key={i} className="stat-card" title={s.tip}>
          <div className="stat-number" style={{ color: s.c }}>{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  </Panel>
);

export default About;
