import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const ch = 'ディヴヤン01{}[]<>/=+-_*&#@!~';
    const fs = 14, cols = Math.floor(c.width / fs), drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#4ade80';
      ctx.font = `${fs}px 'Fira Code',monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(ch[Math.floor(Math.random() * ch.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    const onVisibility = () => { if (document.hidden) cancelAnimationFrame(id); else draw(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return <canvas ref={ref} id="matrix-rain" />;
};

export default MatrixRain;
