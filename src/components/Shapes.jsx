import React, { useEffect, useRef } from 'react';

/* Pearl/glass orbs — matching reference images */
const ORBS = [
  { size: 110, top: '7%',  left: '2%',   h: 265, s: 65, l: 75, dur: 20 },
  { size: 70,  top: '62%', right: '4%',  h: 28,  s: 80, l: 80, dur: 26, rev: true },
  { size: 50,  top: '18%', right: '10%', h: 200, s: 70, l: 82, dur: 17 },
  { size: 80,  bottom:'12%', left:'5%',  h: 330, s: 60, l: 82, dur: 23, rev: true },
  { size: 38,  top: '44%', left: '16%',  h: 150, s: 55, l: 84, dur: 19 },
  { size: 28,  top: '30%', right:'30%',  h: 255, s: 50, l: 88, dur: 15 },
  { size: 20,  bottom:'35%', right:'20%', h: 15, s: 70, l: 85, dur: 13, rev: true },
];

export default function Shapes() {
  const containerRef = useRef(null);

  /* Mouse parallax — each orb shifts at a different depth */
  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll('.glass-orb');
    const handle = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orbs?.forEach((orb, i) => {
        const depth = (i % 3 + 1) * 8;            // 8 / 16 / 24 px max shift
        orb.style.transform =
          `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <div ref={containerRef} className="shapes-container">
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="glass-orb"
          style={{
            width:  o.size,
            height: o.size,
            top:    o.top,
            left:   o.left,
            right:  o.right,
            bottom: o.bottom,
            /* Pearl radial gradient — bright specular spot + colour falloff */
            background: `
              radial-gradient(circle at 32% 28%,
                hsla(${o.h},100%,97%,0.95) 0%,
                hsla(${o.h},${o.s}%,${o.l}%,0.75) 18%,
                hsla(${o.h},${o.s - 10}%,${o.l - 8}%,0.45) 45%,
                hsla(${o.h},${o.s - 20}%,${o.l - 15}%,0.15) 75%,
                transparent 100%)
            `,
            animationDuration: `${o.dur}s`,
            animationDirection: o.rev ? 'reverse' : 'normal',
            transition: 'transform 0.12s ease-out',
          }}
        />
      ))}
    </div>
  );
}
