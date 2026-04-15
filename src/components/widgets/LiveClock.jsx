import React, { useEffect, useState } from 'react';

export default function LiveClock({ label = 'LOCAL · IN' }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  /* Angles: 12 o'clock = -90deg */
  const hourAngle = (h % 12) * 30 + m * 0.5 - 90;
  const minAngle  = m * 6 + s * 0.1 - 90;
  const secAngle  = s * 6 - 90;

  const polar = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return [50 + Math.cos(rad) * r, 50 + Math.sin(rad) * r];
  };

  const [hx, hy] = polar(hourAngle, 24);
  const [mx, my] = polar(minAngle, 34);
  const [sx, sy] = polar(secAngle, 38);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="widget widget-clock">
      <div className="widget-label">{label}</div>
      <div className="clock-body">
        <svg viewBox="0 0 100 100" className="clock-face">
          <circle cx="50" cy="50" r="47" className="clock-ring" />
          {Array.from({ length: 12 }).map((_, i) => {
            const [x1, y1] = polar(i * 30 - 90, 42);
            const [x2, y2] = polar(i * 30 - 90, 46);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                className={`clock-tick ${i % 3 === 0 ? 'major' : ''}`}
              />
            );
          })}
          <line x1="50" y1="50" x2={hx} y2={hy} className="clock-hand hour" />
          <line x1="50" y1="50" x2={mx} y2={my} className="clock-hand min" />
          <line x1="50" y1="50" x2={sx} y2={sy} className="clock-hand sec" />
          <circle cx="50" cy="50" r="2.5" className="clock-pin" />
        </svg>
        <div className="clock-digital">
          <div className="clock-time">
            {pad(h)}<span className="blink">:</span>{pad(m)}
            <span className="clock-sec">:{pad(s)}</span>
          </div>
          <div className="clock-zone">IST · UTC+5:30</div>
        </div>
      </div>
    </div>
  );
}
