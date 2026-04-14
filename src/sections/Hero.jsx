import React from 'react';
import { ArrowDown } from 'lucide-react';
import useType from '../hooks/useType';

const Hero = () => {
  const boot = useType('> divyansh@studio — connected', 25, 200);
  const tag = useType('I build websites that earn attention, hold it, and convert it.', 30, 1600);

  return (
    <div className="section-content" style={{ textAlign: 'center' }}>
      <p className="mono" style={{ color: 'var(--neon-green)', fontSize: '0.85rem', minHeight: '1.2em', marginBottom: '1rem' }}>
        {boot}<span className="cursor-blink" />
      </p>
      <h1 className="display glitch" data-text="DIVYANSH SOOD" style={{ color: 'var(--neon-green)', textShadow: '0 0 60px rgba(74,222,128,0.35)', marginBottom: '1.5rem' }}>
        DIVYANSH SOOD
      </h1>
      <p className="loud-sub">{tag}</p>
      <div style={{ marginTop: '2.5rem', opacity: 0.3, animation: 'bounce 2.5s infinite' }}>
        <ArrowDown size={22} style={{ color: 'var(--neon-green)' }} />
      </div>
    </div>
  );
};

export default Hero;
