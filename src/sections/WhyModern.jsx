import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Panel from '../components/Panel';

const WhyModern = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <ShieldCheck size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-green)' }}>why_modern</p>
        <h2 className="heading" style={{ margin: 0 }}>Old Sites Break. Ours Don't.</h2>
      </div>
    </div>
    <div className="compare-grid">
      <div className="compare-card bad">
        <h4 style={{ color: 'var(--neon-red)' }}>Old Way</h4>
        <ul>
          <li>✗ Crashes under traffic</li>
          <li>✗ Gets hacked easily</li>
          <li>✗ Slow and clunky</li>
          <li>✗ Expensive to maintain</li>
        </ul>
      </div>
      <div className="compare-card good">
        <h4 style={{ color: 'var(--neon-green)' }}>Our Way</h4>
        <ul>
          <li>✓ Handles millions of visits</li>
          <li>✓ Virtually unhackable</li>
          <li>✓ Lightning fast forever</li>
          <li>✓ Near-zero running costs</li>
        </ul>
      </div>
    </div>
  </Panel>
);

export default WhyModern;
