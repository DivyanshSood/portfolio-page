import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const d = useRef(null), r = useRef(null);
  useEffect(() => {
    const m = (e) => {
      if (d.current) { d.current.style.left = e.clientX - 4 + 'px'; d.current.style.top = e.clientY - 4 + 'px'; }
      if (r.current) { r.current.style.left = e.clientX - 20 + 'px'; r.current.style.top = e.clientY - 20 + 'px'; }
    };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);
  return <><div ref={d} className="cursor-dot" /><div ref={r} className="cursor-ring" /></>;
};

export default Cursor;
