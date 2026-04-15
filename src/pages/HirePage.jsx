import React from 'react';
import Pricing from '../sections/Pricing';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function HirePage() {
  return (
    <div className="hire-page">
      {/* ── Hero ── */}
      <div className="hire-hero">
        <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-yellow)', marginBottom: '0.75rem' }}>
          work with me
        </p>
        <h1
          className="display"
          style={{
            color: 'var(--text)',
            textAlign: 'center',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          START YOUR<br />PROJECT.
        </h1>
        <p className="body" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', opacity: 0.6 }}>
          Simple pricing. No surprises. Websites that actually do something for your business.
        </p>
      </div>

      {/* ── Pricing ── */}
      <div className="hire-section">
        <Pricing />
      </div>

      {/* ── Divider ── */}
      <div className="hire-divider">
        <div className="hire-divider-line" />
        <span className="mono hire-divider-label">what clients say</span>
        <div className="hire-divider-line" />
      </div>

      {/* ── Testimonials ── */}
      <div className="hire-section">
        <Testimonials />
      </div>

      {/* ── Contact ── */}
      <div className="hire-section hire-contact">
        <Contact />
      </div>
    </div>
  );
}
