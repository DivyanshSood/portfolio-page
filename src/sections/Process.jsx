import React from 'react';
import { Sparkles, Palette, Code2, Rocket } from 'lucide-react';

const steps = [
  { icon: <Sparkles size={22} />, t: 'Discover', d: 'We learn your brand & goals.', c: 'var(--neon-pink)' },
  { icon: <Palette size={22} />, t: 'Design', d: 'Premium, stunning interfaces.', c: 'var(--neon-purple)' },
  { icon: <Code2 size={22} />, t: 'Build', d: 'Modern tech, peak performance.', c: 'var(--neon-cyan)' },
  { icon: <Rocket size={22} />, t: 'Launch', d: 'Global deploy, zero downtime.', c: 'var(--neon-green)' },
];

const Process = () => (
  <div className="section-content" style={{ textAlign: 'center' }}>
    <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-purple)' }}>the_process</p>
    <h2 className="heading" style={{ marginBottom: '2rem' }}>4 Steps. Zero Stress.</h2>
    <div className="process-grid">
      {steps.map((s, i) => (
        <div key={i} className="process-card">
          <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
          <div style={{ color: s.c }}>{s.icon}</div>
          <h4 style={{ color: s.c }}>{s.t}</h4>
          <p>{s.d}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Process;
