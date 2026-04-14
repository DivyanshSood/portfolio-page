import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Panel from '../components/Panel';

const WhyModern = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <ShieldCheck size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-green)' }}>why_modern</p>
        <h2 className="heading" style={{ margin: 0 }}>What You Build On Matters.</h2>
      </div>
    </div>
    <div className="compare-grid">
      <div className="compare-card bad">
        <h4 style={{ color: 'var(--neon-red)' }}>Legacy Stack</h4>
        <ul>
          <li>✗ Collapses under traffic spikes</li>
          <li>✗ Server exposed to every attack vector</li>
          <li>✗ Slows down as plugins accumulate</li>
          <li>✗ Hosting bills scale with visits</li>
        </ul>
      </div>
      <div className="compare-card good">
        <h4 style={{ color: 'var(--neon-green)' }}>Modern Stack</h4>
        <ul>
          <li>✓ Scales to any traffic without config changes</li>
          <li>✓ Static by default — no server to breach</li>
          <li>✓ Sub-second load times, permanently</li>
          <li>✓ Near-zero running costs at any scale</li>
        </ul>
      </div>
    </div>
  </Panel>
);

export default WhyModern;
