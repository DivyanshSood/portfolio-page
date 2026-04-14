import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "Divyansh completely transformed our school's online presence. The site loads incredibly fast and the admin panel made our team's life so much easier. Exactly what we needed.",
    name: 'Modern KBS',
    role: 'Education Platform',
    c: 'var(--neon-green)',
  },
  {
    text: 'Working with Divyansh was seamless from start to finish. He understood exactly what our brand needed and delivered beyond expectations — clean, fast, and on time.',
    name: 'Red Line Studios',
    role: 'Streetwear Brand',
    c: 'var(--neon-blue)',
  },
];

const Testimonials = () => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-pink)' }}>testimonials</p>
      <h2 className="heading">What Clients Say</h2>
    </div>
    <div className="testimonials-grid">
      {reviews.map((r, i) => (
        <div key={i} className="testimonial-card" style={{ '--tc': r.c }}>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
            {Array(5).fill(null).map((_, j) => <Star key={j} size={13} style={{ fill: r.c, color: r.c }} />)}
          </div>
          <p className="body" style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>"{r.text}"</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="testimonial-avatar" style={{ background: r.c + '18', border: `1px solid ${r.c}50`, color: r.c }}>
              {r.name[0]}
            </div>
            <div>
              <p className="mono" style={{ color: r.c, fontSize: '0.82rem' }}>{r.name}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>{r.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Testimonials;
