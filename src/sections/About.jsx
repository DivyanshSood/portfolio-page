import React from 'react';
import { Terminal, MapPin } from 'lucide-react';
import Panel from '../components/Panel';

const About = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <Terminal size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-green)' }}>about_me</p>
        <h2 className="heading" style={{ margin: 0 }}>Who's Behind the Code</h2>
      </div>
    </div>
    <p className="body-loud" style={{ marginBottom: '1rem' }}>
      I'm Divyansh Sood — a full-stack web developer and designer based in India. I build high-performance,
      visually sharp websites for businesses that want to stand out and convert.
    </p>
    <p className="body" style={{ marginBottom: '2rem' }}>
      I've worked with schools, e-commerce brands, and streetwear labels. Whether it's a CMS, a Shopify store,
      or a fully custom web app — I handle it end to end: design, code, deploy, and beyond.
    </p>
    <div className="about-location">
      <MapPin size={13} style={{ color: 'var(--neon-green)' }} />
      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>India · Available for remote projects worldwide</span>
    </div>
    <div className="stats-grid" style={{ marginTop: '1.75rem' }}>
      {[
        { num: '3+', label: 'Years Building', c: 'var(--neon-green)' },
        { num: '10+', label: 'Projects Shipped', c: 'var(--neon-cyan)' },
        { num: '100%', label: 'Client Satisfaction', c: 'var(--neon-purple)' },
      ].map((s, i) => (
        <div key={i} className="stat-card">
          <div className="stat-number" style={{ color: s.c }}>{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  </Panel>
);

export default About;
