import React from 'react';

/*  12-week commit/activity graph. Deterministic seed per week so it's stable
    across renders but still "looks like real activity". */
const weeks = Array.from({ length: 12 }).map((_, i) => {
  const seed = Math.sin(i * 7.13 + 0.91) * 10000;
  const pseudo = seed - Math.floor(seed);
  return Math.round(18 + pseudo * 82);
});
const peak = Math.max(...weeks);

export default function ActivityGraph() {
  const total = weeks.reduce((a, b) => a + b, 0);
  return (
    <div className="widget widget-graph">
      <div className="widget-label">SHIP · LAST 12 WEEKS</div>
      <svg viewBox="0 0 240 80" className="graph-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {/* grid */}
        <line x1="0"   y1="20" x2="240" y2="20" className="graph-grid" />
        <line x1="0"   y1="40" x2="240" y2="40" className="graph-grid" />
        <line x1="0"   y1="60" x2="240" y2="60" className="graph-grid" />
        {/* bars */}
        {weeks.map((v, i) => {
          const barW = 240 / weeks.length - 4;
          const x = i * (240 / weeks.length) + 2;
          const h = Math.max(3, (v / peak) * 72);
          const y = 76 - h;
          return (
            <rect
              key={i}
              x={x} y={y} width={barW} height={h}
              fill="url(#bar-grad)"
              className="graph-bar"
              rx="1"
            />
          );
        })}
      </svg>
      <div className="graph-foot">
        <span>~ {total} units shipped</span>
        <span className="graph-peak">peak wk: {peak}</span>
      </div>
    </div>
  );
}
