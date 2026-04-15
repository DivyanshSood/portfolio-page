import React from 'react';

/*  Tiny inline SVG trend line + optional area fill. */
export default function Sparkline({ points = [], width = 120, height = 32, label }) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = Math.max(1, max - min);

  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });

  const path = coords.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  const last = coords[coords.length - 1];

  return (
    <div className="widget-spark">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <path d={area} className="spark-area" />
        <path d={path} className="spark-line" />
        {last && <circle cx={last[0]} cy={last[1]} r="2.5" className="spark-dot" />}
      </svg>
      {label && <span className="spark-label">{label}</span>}
    </div>
  );
}
