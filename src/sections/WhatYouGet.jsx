import React from 'react';
import { Globe } from 'lucide-react';
import Panel from '../components/Panel';

const WhatYouGet = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <Globe size={30} style={{ color: 'var(--neon-blue)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-blue)' }}>what_you_get</p>
        <h2 className="heading" style={{ margin: 0 }}>Speed Is a Business Metric.</h2>
      </div>
    </div>
    <p className="body-loud">A one-second delay costs 7% in conversions. Every site I ship scores 95+ on Google Lighthouse — deployed on a global CDN so load time doesn't depend on where your visitor is sitting.</p>
    <div style={{ marginTop: '1.5rem' }}>
      {[
        { label: 'Speed', val: '98', color: 'var(--neon-green)' },
        { label: 'SEO', val: '96', color: 'var(--neon-blue)' },
        { label: 'Accessibility', val: '94', color: 'var(--neon-orange)' },
      ].map((b, i) => (
        <div key={i} className="bar-row">
          <div className="bar-label">
            <span style={{ color: b.color }}>{b.label}</span>
            <span className="mono">{b.val}</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${b.val}%`, background: b.color }} />
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

export default WhatYouGet;
