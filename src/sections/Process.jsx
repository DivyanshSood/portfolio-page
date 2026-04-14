import React from 'react';
import { Sparkles, Palette, Code2, Rocket } from 'lucide-react';

const steps = [
  { icon: <Sparkles size={22} />, t: 'Discover', d: 'I audit your current presence, map your audience, and define what success looks like in measurable terms.', c: 'var(--neon-pink)' },
  { icon: <Palette size={22} />, t: 'Design', d: 'Every element earns its place — layout, typography, colour, and motion all built around how your audience actually behaves.', c: 'var(--neon-purple)' },
  { icon: <Code2 size={22} />, t: 'Build', d: 'React or Next.js, optimised from the first commit. Clean, documented code any developer can pick up and continue.', c: 'var(--neon-cyan)' },
  { icon: <Rocket size={22} />, t: 'Launch', d: 'Deployed to a global CDN with zero-downtime rollout. Performance and uptime monitored from day one.', c: 'var(--neon-green)' },
];

const Process = () => (
  <div className="section-content" style={{ textAlign: 'center' }}>
    <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-purple)' }}>the_process</p>
    <h2 className="heading" style={{ marginBottom: '2rem' }}>How Every Project Runs.</h2>
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
