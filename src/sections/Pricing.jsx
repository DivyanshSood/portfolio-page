import React from 'react';

const plans = [
  {
    name: 'Landing Page',
    price: '₹5,000',
    sub: 'starting from',
    tip: '↑ A 1-second faster load time increases conversions by 27% on mobile. That\'s what this buys.',
    c: 'var(--neon-green)',
    features: ['1 page, fully responsive', 'GSAP animations', 'SEO optimised', 'Contact form included', 'Delivered in 5 days'],
  },
  {
    name: 'Business Site',
    price: '₹25,000',
    sub: 'starting from',
    tip: '↑ 75% of users judge a business\'s credibility entirely by its website design.',
    c: 'var(--neon-cyan)',
    featured: true,
    features: ['Up to 8 pages', 'CMS integration', 'Blog or portfolio section', 'Analytics setup', 'Delivered in 2 weeks'],
  },
  {
    name: 'Full Stack',
    price: 'Custom',
    sub: "let's talk scope",
    tip: '↑ Amazon calculated that 1 extra second of load time would cost them $1.6B a year.',
    c: 'var(--neon-purple)',
    features: ['Web app or e-commerce', 'Auth, DB & admin panel', 'Shopify or custom store', 'Ongoing support available', 'Timeline on request'],
  },
];

const Pricing = () => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-yellow)' }}>pricing</p>
      <h2 className="heading">Clear Pricing. Defined Scope.</h2>
      <p className="body" style={{ marginTop: '0.5rem' }}>Every plan includes a fixed scope, a fixed price, and a delivery date — agreed before work starts.</p>
    </div>
    <div className="pricing-grid">
      {plans.map((p, i) => (
        <div key={i} className={`pricing-card ${p.featured ? 'featured' : ''}`} style={{ '--pc': p.c }}>
          {p.featured && <div className="pricing-badge">MOST POPULAR</div>}
          <p className="mono" style={{ color: p.c, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{p.name}</p>
          <div className="pricing-price" style={{ color: p.c }} title={p.tip}>{p.price}</div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginBottom: '1.5rem' }}>{p.sub}</p>
          <ul className="pricing-features">
            {p.features.map((f, j) => <li key={j}><span style={{ color: p.c }}>✓</span> {f}</li>)}
          </ul>
          <a href="mailto:sood.divyansh007@gmail.com" className="btn" style={{ width: '100%', justifyContent: 'center', borderColor: p.c, color: p.c, marginTop: '1.5rem' }}>
            GET STARTED
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Pricing;
