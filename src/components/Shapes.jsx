import React from 'react';

const Shapes = () => (
  <div className="shapes-container">
    {[
      { w: 65, h: 65, c: 'var(--neon-green)', t: '10%', l: '5%', dur: '14s', br: '8px' },
      { w: 50, h: 50, c: 'var(--neon-pink)', t: '55%', r: '7%', dur: '18s', dir: 'reverse', br: '50%' },
      { w: 35, h: 35, c: 'var(--neon-cyan)', t: '22%', r: '18%', dur: '11s' },
      { w: 80, h: 80, c: 'var(--neon-purple)', b: '12%', l: '8%', dur: '20s', br: '50% 8px' },
      { w: 30, h: 30, c: 'var(--neon-orange)', b: '40%', r: '28%', dur: '13s', dir: 'reverse', br: '6px' },
    ].map((s, i) => (
      <div key={i} className="shape-3d" style={{
        width: s.w, height: s.h, borderColor: s.c,
        top: s.t, left: s.l, right: s.r, bottom: s.b,
        '--dur': s.dur, '--dir': s.dir || 'normal', borderRadius: s.br || '0',
      }} />
    ))}
  </div>
);

export default Shapes;
