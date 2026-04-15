import React, { useEffect, useState } from 'react';

export default function StatusWidget() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  /* Available 10:00–21:00 IST, Mon–Sat */
  const h   = now.getHours();
  const day = now.getDay();
  const isWorking = h >= 10 && h < 21 && day !== 0;

  return (
    <div className="widget widget-status">
      <div className="widget-label">SYSTEM · STATUS</div>
      <ul className="status-list">
        <li>
          <span className={`stat-pulse ${isWorking ? 'ok' : 'idle'}`} />
          <span className="stat-key">Availability</span>
          <span className="stat-val">{isWorking ? 'ONLINE · taking briefs' : 'OFFLINE · reply < 12h'}</span>
        </li>
        <li>
          <span className="stat-pulse ok" />
          <span className="stat-key">Response SLA</span>
          <span className="stat-val">&lt; 2h · working hrs</span>
        </li>
        <li>
          <span className="stat-pulse warn" />
          <span className="stat-key">Capacity</span>
          <span className="stat-val">1 slot · next sprint</span>
        </li>
        <li>
          <span className="stat-pulse ok" />
          <span className="stat-key">Current</span>
          <span className="stat-val">AI-gen v2 · in build</span>
        </li>
      </ul>
    </div>
  );
}
