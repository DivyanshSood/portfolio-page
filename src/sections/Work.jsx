import React from 'react';
import { ExternalLink } from 'lucide-react';
import projects from '../data/projects';

const Work = () => (
  <div className="section-content">
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-orange)' }}>shipped</p>
      <h2 className="heading">Work That Shipped.</h2>
      <p className="body" style={{ maxWidth: 560, margin: '0.75rem auto 0', opacity: 0.75 }}>
        Each project had a specific problem — a broken funnel, an invisible brand, a platform holding growth back. Below is what was built and what changed because of it.
      </p>
    </div>
    <div className="work-grid">
      {projects.map((p, i) => (
        <div key={i} className="work-card">
          <div className="work-preview" style={{ background: p.grad }}>
            <div className="work-browser-bar">
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              </div>
              <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{p.name}</span>
            </div>
            <div className="work-preview-content">
              <div style={{ width: '60%', height: 8, borderRadius: 4, background: p.c + '50', marginBottom: 10 }} />
              <div style={{ width: '85%', height: 5, borderRadius: 4, background: p.c + '25', marginBottom: 6 }} />
              <div style={{ width: '70%', height: 5, borderRadius: 4, background: p.c + '25', marginBottom: 18 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 52, height: 22, borderRadius: 3, background: p.c + '70' }} />
                <div style={{ width: 52, height: 22, borderRadius: 3, background: p.c + '20' }} />
              </div>
            </div>
          </div>
          <div className="work-card-body" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div>
              <h4 className="mono" style={{ color: p.c, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{p.name}</h4>
              <p className="body" style={{ fontSize: '0.82rem', margin: '0 0 0.6rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.4 }}>{p.hook}</p>
              <p className="body" style={{ fontSize: '0.74rem', margin: 0, opacity: 0.78, lineHeight: 1.6 }}>{p.story}</p>
            </div>
            <div style={{ marginTop: '0.25rem' }}>
              {p.url === '#'
                ? <span className="btn" style={{ padding: '0.45rem 0.8rem', fontSize: '0.65rem', opacity: 0.35, cursor: 'not-allowed', borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }}>LAUNCHING SOON</span>
                : <a href={p.url} target="_blank" rel="noreferrer" className="btn" style={{ padding: '0.45rem 0.8rem', fontSize: '0.65rem' }}><ExternalLink size={11} /> SEE IT LIVE</a>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Work;
