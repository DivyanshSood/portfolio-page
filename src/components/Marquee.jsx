import React from 'react';

const Marquee = () => {
  const items = ['REACT', '•', 'NEXT.JS', '•', 'NODE', '•', 'VERCEL', '•', 'SHOPIFY', '•', 'FIGMA', '•', 'GSAP', '•', 'TYPESCRIPT'];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
};

export default Marquee;
