import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const dot  = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      // Both elements follow instantly — no lerp, no delay
      if (dot.current)  dot.current.style.transform  = `translate(${x - 4}px,  ${y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
};

export default Cursor;
