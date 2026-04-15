import React, { useEffect, useRef, useState } from 'react';

/*  Circular progress ring. `pct` (0–100) animates in on first mount. */
export default function MetricRing({ pct = 0, label, suffix = '', size = 96 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) { setVal(pct); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const dur = 900;
      let raf;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(pct * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      obs.disconnect();
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (val / 100) * c;

  return (
    <div className="widget-ring" ref={ref} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="ring-svg">
        <circle cx="50" cy="50" r={r} className="ring-track" />
        <circle
          cx="50" cy="50" r={r}
          className="ring-fill"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="ring-inner">
        <div className="ring-val">{Math.round(val)}{suffix}</div>
        {label && <div className="ring-lbl">{label}</div>}
      </div>
    </div>
  );
}
