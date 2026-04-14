import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Terminal, Lock, Globe, ShieldAlert, ArrowDown,
  ExternalLink, Mail, ShieldCheck, MessageCircle,
  Rocket, Palette, Code2, Sparkles, GitFork,
  MapPin, Send, Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ====  MATRIX RAIN  ==== */
const MatrixRain = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const ch = 'ディヴヤン01{}[]<>/=+-_*&#@!~';
    const fs = 14, cols = Math.floor(c.width / fs), drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#4ade80';
      ctx.font = `${fs}px 'Fira Code',monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(ch[Math.floor(Math.random() * ch.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    const onVisibility = () => { if (document.hidden) cancelAnimationFrame(id); else draw(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return <canvas ref={ref} id="matrix-rain" />;
};

/* ====  CURSOR  ==== */
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

/* ====  TYPEWRITER  ==== */
const useType = (text, speed = 40, delay = 0) => {
  const [o, setO] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => { if (i < text.length) { setO(text.slice(0, i + 1)); i++; } else clearInterval(iv); }, speed);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return o;
};

/* ====  PANEL  ==== */
const Panel = ({ children, style }) => (
  <div className="panel" style={style}>
    <div className="panel-bar"><div className="panel-dot dot-r" /><div className="panel-dot dot-a" /><div className="panel-dot dot-g" /></div>
    {children}
  </div>
);

/* ====  GAME  ==== */
const Game = () => {
  const [score, setScore] = useState(0);
  const [on, setOn] = useState(false);
  const [time, setTime] = useState(12);
  const [nodes, setNodes] = useState([]);
  const sp = useRef(null);

  useEffect(() => {
    let t; if (on && time > 0) t = setInterval(() => setTime(p => p - 1), 1000);
    else if (time === 0) { setOn(false); clearInterval(sp.current); }
    return () => clearInterval(t);
  }, [on, time]);

  useEffect(() => {
    if (on) { sp.current = setInterval(() => {
      setNodes(prev => { if (prev.length >= 7) return prev; const r = Math.random() < 0.2;
        return [...prev, { id: Date.now() + Math.random(), x: Math.random() * 78 + 11, y: Math.random() * 78 + 11, pts: r ? 30 : 10, rare: r }]; });
    }, 480); }
    return () => clearInterval(sp.current);
  }, [on]);

  const go = () => { setScore(0); setTime(12); setNodes([]); setOn(true); };
  const pop = useCallback((id, pts) => { if (!on) return; setScore(s => s + pts); setNodes(p => p.filter(n => n.id !== id)); }, [on]);

  return (
    <Panel style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <p className="label" style={{ color: 'var(--neon-red)' }}><ShieldAlert size={13} /> firewall_breach</p>
          <p className="body" style={{ margin: 0, fontSize: '0.75rem' }}>Pop the nodes. Beat the clock.</p>
        </div>
        <div className="mono" style={{ textAlign: 'right', fontSize: '0.85rem', lineHeight: 1.8 }}>
          <p style={{ color: 'var(--neon-cyan)' }}>{score}mb</p>
          <p style={{ color: 'var(--neon-red)' }}>{time}s</p>
        </div>
      </div>
      <div className="game-arena">
        <div className="grid-bg" />
        {!on && time === 12 && <div className="game-center"><button onClick={go} className="btn" style={{ borderColor: 'var(--neon-red)', color: 'var(--neon-red)' }}><Lock size={14} /> START</button></div>}
        {!on && time === 0 && <div className="game-center">
          <p className="heading" style={{ color: 'var(--neon-red)', fontSize: '1.5rem', marginBottom: '0.4rem' }}>GAME OVER</p>
          <p className="mono" style={{ color: 'var(--neon-cyan)', marginBottom: '1rem' }}>{score}mb extracted</p>
          <button onClick={go} className="btn">RETRY</button>
        </div>}
        {on && nodes.map(n => (
          <div key={n.id} className={`hack-node ${n.rare ? 'rare' : ''}`} onClick={() => pop(n.id, n.pts)}
            style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.rare ? 32 : 46, height: n.rare ? 32 : 46 }}>
            {n.rare ? 'FF' : '01'}
          </div>
        ))}
      </div>
    </Panel>
  );
};

/* ====  3D SHAPES  ==== */
const Shapes = () => (
  <div className="shapes-container">
    {[
      { w: 65, h: 65, c: 'var(--neon-green)', t: '10%', l: '5%', dur: '14s', br: '8px' },
      { w: 50, h: 50, c: 'var(--neon-pink)', t: '55%', r: '7%', dur: '18s', dir: 'reverse', br: '50%' },
      { w: 35, h: 35, c: 'var(--neon-cyan)', t: '22%', r: '18%', dur: '11s' },
      { w: 80, h: 80, c: 'var(--neon-purple)', b: '12%', l: '8%', dur: '20s', br: '50% 8px' },
      { w: 30, h: 30, c: 'var(--neon-orange)', b: '40%', r: '28%', dur: '13s', dir: 'reverse', br: '6px' },
    ].map((s, i) => <div key={i} className="shape-3d" style={{ width: s.w, height: s.h, borderColor: s.c, top: s.t, left: s.l, right: s.r, bottom: s.b, '--dur': s.dur, '--dir': s.dir || 'normal', borderRadius: s.br || '0' }} />)}
  </div>
);

/* ====  MARQUEE  ==== */
const Marquee = () => {
  const items = ['REACT', '•', 'NEXT.JS', '•', 'NODE', '•', 'VERCEL', '•', 'SHOPIFY', '•', 'FIGMA', '•', 'GSAP', '•', 'TYPESCRIPT'];
  return <div className="marquee-wrap"><div className="marquee-track">{[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}</div></div>;
};

/* ====  ABOUT  ==== */
const About = () => (
  <Panel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <Terminal size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
      <div>
        <p className="label" style={{ color: 'var(--neon-green)' }}>about_me</p>
        <h2 className="heading" style={{ margin: 0 }}>Who's Behind the Code</h2>
      </div>
    </div>
    <p className="body-loud" style={{ marginBottom: '1rem' }}>
      I'm Divyansh Sood — a full-stack web developer and designer based in India. I build high-performance,
      visually sharp websites for businesses that want to stand out and convert.
    </p>
    <p className="body" style={{ marginBottom: '2rem' }}>
      I've worked with schools, e-commerce brands, and streetwear labels. Whether it's a CMS, a Shopify store,
      or a fully custom web app — I handle it end to end: design, code, deploy, and beyond.
    </p>
    <div className="about-location">
      <MapPin size={13} style={{ color: 'var(--neon-green)' }} />
      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>India · Available for remote projects worldwide</span>
    </div>
    <div className="stats-grid" style={{ marginTop: '1.75rem' }}>
      {[
        { num: '3+', label: 'Years Building', c: 'var(--neon-green)' },
        { num: '10+', label: 'Projects Shipped', c: 'var(--neon-cyan)' },
        { num: '100%', label: 'Client Satisfaction', c: 'var(--neon-purple)' },
      ].map((s, i) => (
        <div key={i} className="stat-card">
          <div className="stat-number" style={{ color: s.c }}>{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  </Panel>
);

/* ====  SKILLS  ==== */
const Skills = () => {
  const stack = [
    { label: 'Frontend', color: 'var(--neon-cyan)', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'] },
    { label: 'Backend', color: 'var(--neon-orange)', items: ['Node.js', 'Express', 'Supabase', 'Firebase', 'REST APIs'] },
    { label: 'Tools & Platforms', color: 'var(--neon-purple)', items: ['Figma', 'Vercel', 'Shopify', 'Git', 'Vite', 'Netlify'] },
  ];
  return (
    <Panel>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
        <Code2 size={30} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
        <div>
          <p className="label" style={{ color: 'var(--neon-cyan)' }}>tech_stack</p>
          <h2 className="heading" style={{ margin: 0 }}>Tools of the Trade</h2>
        </div>
      </div>
      <div className="skills-grid">
        {stack.map((group, i) => (
          <div key={i} className="skills-group">
            <p className="mono" style={{ color: group.color, fontSize: '0.7rem', marginBottom: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{group.label}</p>
            <div className="skills-pills">
              {group.items.map((item, j) => (
                <span key={j} className="skill-pill" style={{ borderColor: group.color + '50', color: group.color, background: group.color + '0d' }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

/* ====  PRICING  ==== */
const Pricing = () => {
  const plans = [
    {
      name: 'Landing Page',
      price: '₹15,000',
      sub: 'starting from',
      c: 'var(--neon-green)',
      features: ['1 page, fully responsive', 'GSAP animations', 'SEO optimised', 'Contact form included', 'Delivered in 5 days'],
    },
    {
      name: 'Business Site',
      price: '₹35,000',
      sub: 'starting from',
      c: 'var(--neon-cyan)',
      featured: true,
      features: ['Up to 8 pages', 'CMS integration', 'Blog or portfolio section', 'Analytics setup', 'Delivered in 2 weeks'],
    },
    {
      name: 'Full Stack',
      price: 'Custom',
      sub: 'let\'s talk scope',
      c: 'var(--neon-purple)',
      features: ['Web app or e-commerce', 'Auth, DB & admin panel', 'Shopify or custom store', 'Ongoing support available', 'Timeline on request'],
    },
  ];
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-yellow)' }}>pricing</p>
        <h2 className="heading">Simple, Honest Pricing</h2>
        <p className="body" style={{ marginTop: '0.5rem' }}>No hidden costs. No surprises.</p>
      </div>
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <div key={i} className={`pricing-card ${p.featured ? 'featured' : ''}`} style={{ '--pc': p.c }}>
            {p.featured && <div className="pricing-badge">MOST POPULAR</div>}
            <p className="mono" style={{ color: p.c, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{p.name}</p>
            <div className="pricing-price" style={{ color: p.c }}>{p.price}</div>
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
};

/* ====  TESTIMONIALS  ==== */
const Testimonials = () => {
  const reviews = [
    {
      text: 'Divyansh completely transformed our school\'s online presence. The site loads incredibly fast and the admin panel made our team\'s life so much easier. Exactly what we needed.',
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
  return (
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
};

/* ====  APP  ==== */
// Sections: 0 Hero | 1 Marquee | 2 About | 3 What You Get | 4 Why Modern |
//           5 Skills | 6 Process | 7 Work | 8 Pricing | 9 Testimonials |
//           10 Game | 11 Contact
const TOTAL = 12;

export default function App() {
  const refs = useRef([]);
  const [act, setAct] = useState(0);
  const [pct, setPct] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const boot = useType('> divyansh@studio — connected', 25, 200);
  const tag = useType('Websites that make people stop scrolling.', 30, 1600);

  const setRef = (el, i) => { refs.current[i] = el; };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    window.location.href = `mailto:sood.divyansh007@gmail.com?subject=${encodeURIComponent('Project Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Divyansh,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
    setFormSent(true);
  };

  useEffect(() => {
    const onScroll = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setPct(h > 0 ? (window.scrollY / h) * 100 : 0); };
    window.addEventListener('scroll', onScroll);

    const ctx = gsap.context(() => {
      refs.current.forEach((sec, i) => {
        if (!sec) return;
        const inner = sec.querySelector('.section-content');
        if (!inner) return;

        const anims = [
          { from: { scale: 0.5, rotateX: -25, opacity: 0 }, to: { scale: 1, rotateX: 0, opacity: 1 } },
          { from: { y: 80, opacity: 0 }, to: { y: 0, opacity: 1 } },
          { from: { rotateY: 50, x: -120, opacity: 0 }, to: { rotateY: 0, x: 0, opacity: 1 } },
          { from: { scale: 0.7, rotateZ: -5, opacity: 0 }, to: { scale: 1, rotateZ: 0, opacity: 1 } },
          { from: { rotateY: -50, x: 120, opacity: 0 }, to: { rotateY: 0, x: 0, opacity: 1 } },
          { from: { y: 120, rotateX: 12, opacity: 0 }, to: { y: 0, rotateX: 0, opacity: 1 } },
          { from: { scale: 0.4, rotateX: 18, rotateY: -18, opacity: 0 }, to: { scale: 1, rotateX: 0, rotateY: 0, opacity: 1 } },
          { from: { y: 80, scale: 0.85, opacity: 0 }, to: { y: 0, scale: 1, opacity: 1 } },
          { from: { rotateY: 50, x: -120, opacity: 0 }, to: { rotateY: 0, x: 0, opacity: 1 } },
          { from: { rotateY: -50, x: 120, opacity: 0 }, to: { rotateY: 0, x: 0, opacity: 1 } },
          { from: { scale: 0.7, rotateZ: 5, opacity: 0 }, to: { scale: 1, rotateZ: 0, opacity: 1 } },
          { from: { y: 80, scale: 0.85, opacity: 0 }, to: { y: 0, scale: 1, opacity: 1 } },
        ];

        const a = anims[i] || anims[0];
        gsap.set(inner, a.from);

        ScrollTrigger.create({ trigger: sec, start: 'top 85%', end: 'top 25%', scrub: 0.5,
          onUpdate: (self) => { const p = self.progress; Object.keys(a.from).forEach(k => gsap.set(inner, { [k]: a.from[k] + (a.to[k] - a.from[k]) * p })); },
          onEnter: () => setAct(i), onEnterBack: () => setAct(i),
        });

        if (i < TOTAL - 1) {
          ScrollTrigger.create({ trigger: sec, start: 'bottom 55%', end: 'bottom 5%', scrub: 0.5,
            onUpdate: (self) => { const p = self.progress; gsap.set(inner, { scale: 1 - p * 0.2, opacity: 1 - p, rotateX: p * -6 }); },
          });
        }
      });
    });

    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const navTo = (i) => refs.current[i]?.scrollIntoView({ behavior: 'smooth' });

  const projects = [
    {
      name: 'modernkbs.com',
      hook: 'A 40-year-old school was losing admissions to its own website.',
      story: 'Parents were judging a legacy institution by a broken homepage — and walking away in under 5 seconds. We rebuilt the whole thing from the ground up: custom admin panel, CMS, admissions flow, toppers wall. Now the site finally carries the weight the school has earned. Enquiries moved. Perception moved faster.',
      url: 'https://modernkbs.com',
      c: 'var(--neon-green)',
      grad: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,211,238,0.06))',
    },
    {
      name: 'In Himalayas',
      hook: 'Every booking site was lying to travelers. Someone had to fix it.',
      story: 'OTAs inflated prices, faked reviews, and hid real operators behind commission walls. We built the antidote — a zero-commission, locally-verified travel platform for Himachal with editorial storytelling, filterable stays, and direct operator contact. Built by locals. Read like a travel journal. Booked like a trusted friend.',
      url: 'https://inhimalayas.vercel.app',
      c: 'var(--neon-pink)',
      grad: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(251,146,60,0.06))',
    },
    {
      name: 'Knitting Knife',
      hook: 'Decades of handcraft. Zero online presence. The internet had never seen her work.',
      story: 'An artisan from Himachal making organic baby knitwear by hand — with no storefront to sell it on. We built a full e-commerce experience that treats every stitch like a signature: story-first product pages, global checkout, a brand voice that actually sounds human. The first international order landed before we were done celebrating launch.',
      url: '#',
      c: 'var(--neon-orange)',
      grad: 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,113,133,0.06))',
    },
    {
      name: 'Red Line Studios',
      hook: 'Premium streetwear. A site that made it look like a dropshipper.',
      story: 'The product was real — limited drops, heavyweight cotton, moto DNA baked into every piece. The old site was flattening all of it. We rebuilt the drop from pixel one: dynamic inventory, racing-coded nav, lookbook reveals, cinematic motion that hits like the products do. Now the site doesn\'t sell clothes. It sells a feeling.',
      url: 'https://red-line-studios.vercel.app',
      c: 'var(--neon-blue)',
      grad: 'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(167,139,250,0.06))',
    },
  ];

  return (
    <>
      <div className="gradient-bg" />
      <div className="noise-overlay" />
      <MatrixRain />
      <Shapes />
      <Cursor />

      <div className="scroll-progress" style={{ width: `${pct}%` }} />
      <div className="nav-dots">{Array.from({ length: TOTAL }).map((_, i) => <button key={i} aria-label={`Go to section ${i + 1}`} className={`nav-dot ${act === i ? 'active' : ''}`} onClick={() => navTo(i)} />)}</div>
      <div className="status-bar"><span><span className="status-dot" />ONLINE</span><span>v2.0</span></div>

      {/* 01 — HERO */}
      <div className="section" ref={el => setRef(el, 0)}>
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
      </div>

      {/* 02 — MARQUEE */}
      <div className="section" ref={el => setRef(el, 1)} style={{ minHeight: 'auto', padding: 0 }}>
        <div className="section-content" style={{ maxWidth: '100%' }}><Marquee /></div>
      </div>

      {/* 03 — ABOUT */}
      <div className="section" ref={el => setRef(el, 2)}>
        <div className="section-content"><About /></div>
      </div>

      {/* 04 — WHAT YOU GET */}
      <div className="section" ref={el => setRef(el, 3)}>
        <div className="section-content">
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Globe size={30} style={{ color: 'var(--neon-blue)', flexShrink: 0 }} />
              <div>
                <p className="label" style={{ color: 'var(--neon-blue)' }}>what_you_get</p>
                <h2 className="heading" style={{ margin: 0 }}>Blazing Fast. Everywhere.</h2>
              </div>
            </div>
            <p className="body-loud">Your site loads in under a second — no matter where your customers are. That means less bounce, more conversions, more revenue.</p>
            <div style={{ marginTop: '1.5rem' }}>
              {[
                { label: 'Speed', val: '98', color: 'var(--neon-green)' },
                { label: 'SEO', val: '96', color: 'var(--neon-blue)' },
                { label: 'Accessibility', val: '94', color: 'var(--neon-orange)' },
              ].map((b, i) => (
                <div key={i} className="bar-row">
                  <div className="bar-label"><span style={{ color: b.color }}>{b.label}</span><span className="mono">{b.val}</span></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${b.val}%`, background: b.color }} /></div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* 05 — WHY MODERN */}
      <div className="section" ref={el => setRef(el, 4)}>
        <div className="section-content">
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={30} style={{ color: 'var(--neon-green)', flexShrink: 0 }} />
              <div>
                <p className="label" style={{ color: 'var(--neon-green)' }}>why_modern</p>
                <h2 className="heading" style={{ margin: 0 }}>Old Sites Break. Ours Don't.</h2>
              </div>
            </div>
            <div className="compare-grid">
              <div className="compare-card bad">
                <h4 style={{ color: 'var(--neon-red)' }}>Old Way</h4>
                <ul>
                  <li>✗ Crashes under traffic</li>
                  <li>✗ Gets hacked easily</li>
                  <li>✗ Slow and clunky</li>
                  <li>✗ Expensive to maintain</li>
                </ul>
              </div>
              <div className="compare-card good">
                <h4 style={{ color: 'var(--neon-green)' }}>Our Way</h4>
                <ul>
                  <li>✓ Handles millions of visits</li>
                  <li>✓ Virtually unhackable</li>
                  <li>✓ Lightning fast forever</li>
                  <li>✓ Near-zero running costs</li>
                </ul>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      {/* 06 — SKILLS */}
      <div className="section" ref={el => setRef(el, 5)}>
        <div className="section-content"><Skills /></div>
      </div>

      {/* 07 — HOW IT WORKS */}
      <div className="section" ref={el => setRef(el, 6)}>
        <div className="section-content" style={{ textAlign: 'center' }}>
          <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-purple)' }}>the_process</p>
          <h2 className="heading" style={{ marginBottom: '2rem' }}>4 Steps. Zero Stress.</h2>
          <div className="process-grid">
            {[
              { icon: <Sparkles size={22} />, t: 'Discover', d: 'We learn your brand & goals.', c: 'var(--neon-pink)' },
              { icon: <Palette size={22} />, t: 'Design', d: 'Premium, stunning interfaces.', c: 'var(--neon-purple)' },
              { icon: <Code2 size={22} />, t: 'Build', d: 'Modern tech, peak performance.', c: 'var(--neon-cyan)' },
              { icon: <Rocket size={22} />, t: 'Launch', d: 'Global deploy, zero downtime.', c: 'var(--neon-green)' },
            ].map((s, i) => (
              <div key={i} className="process-card">
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <div style={{ color: s.c }}>{s.icon}</div>
                <h4 style={{ color: s.c }}>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 08 — WORK */}
      <div className="section" ref={el => setRef(el, 7)}>
        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p className="label" style={{ justifyContent: 'center', color: 'var(--neon-orange)' }}>shipped</p>
            <h2 className="heading">Real Projects. Real Stakes.</h2>
            <p className="body" style={{ maxWidth: 560, margin: '0.75rem auto 0', opacity: 0.75 }}>
              Every site below started with a client bleeding attention, trust, or revenue. Here's what we actually rebuilt — and why it mattered.
            </p>
          </div>
          <div className="work-grid">
            {projects.map((p, i) => (
              <div key={i} className="work-card">
                <div className="work-preview" style={{ background: p.grad }}>
                  <div className="work-browser-bar">
                    <div style={{ display: 'flex', gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    </div>
                    <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{p.name}</span>
                  </div>
                  <div className="work-preview-content">
                    <div style={{ width: '60%', height: 8, borderRadius: 4, background: p.c + '50', marginBottom: 10 }} />
                    <div style={{ width: '85%', height: 5, borderRadius: 4, background: p.c + '25', marginBottom: 6 }} />
                    <div style={{ width: '70%', height: 5, borderRadius: 4, background: p.c + '25', marginBottom: 18 }} />
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 52, height: 22, borderRadius: 3, background: p.c + '70' }} />
                      <div style={{ width: 52, height: 22, borderRadius: 3, background: p.c + '20' }} />
                    </div>
                  </div>
                </div>
                <div className="work-card-body" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <div>
                    <h4 className="mono" style={{ color: p.c, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{p.name}</h4>
                    <p className="body" style={{ fontSize: '0.82rem', margin: '0 0 0.6rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.4 }}>{p.hook}</p>
                    <p className="body" style={{ fontSize: '0.74rem', margin: 0, opacity: 0.78, lineHeight: 1.6 }}>{p.story}</p>
                  </div>
                  <div style={{ marginTop: '0.25rem' }}>
                    {p.url === '#'
                      ? <span className="btn" style={{ padding: '0.45rem 0.8rem', fontSize: '0.65rem', opacity: 0.35, cursor: 'not-allowed', borderColor: 'var(--text-dim)', color: 'var(--text-dim)' }}>LAUNCHING SOON</span>
                      : <a href={p.url} target="_blank" rel="noreferrer" className="btn" style={{ padding: '0.45rem 0.8rem', fontSize: '0.65rem' }}><ExternalLink size={11} /> SEE IT LIVE</a>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 09 — PRICING */}
      <div className="section" ref={el => setRef(el, 8)}>
        <div className="section-content"><Pricing /></div>
      </div>

      {/* 10 — TESTIMONIALS */}
      <div className="section" ref={el => setRef(el, 9)}>
        <div className="section-content"><Testimonials /></div>
      </div>

      {/* 11 — GAME */}
      <div className="section" ref={el => setRef(el, 10)}>
        <div className="section-content"><Game /></div>
      </div>

      {/* 12 — CONTACT */}
      <div className="section" ref={el => setRef(el, 11)}>
        <div className="section-content" style={{ textAlign: 'center' }}>
          <Panel style={{ maxWidth: 640, margin: '0 auto', textAlign: 'left' }}>
            <h2 className="display glitch" data-text="LET'S BUILD" style={{ color: 'var(--neon-green)', fontSize: 'clamp(2rem, 6vw, 4rem)', textShadow: '0 0 40px rgba(74,222,128,0.3)', marginBottom: '0.5rem', textAlign: 'center' }}>
              LET'S BUILD
            </h2>
            <p className="body" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Got an idea? Fill in the form or reach out directly.
            </p>

            {formSent ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p className="heading" style={{ color: 'var(--neon-green)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message sent!</p>
                <p className="body">Your email client opened. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={14} /> SEND MESSAGE
                </button>
              </form>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <a href="mailto:sood.divyansh007@gmail.com" className="btn" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><Mail size={13} /> EMAIL</a>
              <a href="https://wa.me/919816091875" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: '#25D366', color: '#25D366', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><MessageCircle size={13} /> WHATSAPP</a>
              <a href="https://github.com/divyanshsood" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: 'var(--text-dim)', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><GitFork size={13} /> GITHUB</a>
              <a href="https://linkedin.com/in/divyanshsood" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: 'var(--neon-blue)', color: 'var(--neon-blue)', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><ExternalLink size={13} /> LINKEDIN</a>
            </div>
          </Panel>
        </div>
      </div>

      <a href="https://wa.me/919816091875" target="_blank" rel="noreferrer" className="wa-btn"><MessageCircle size={22} /></a>
    </>
  );
}
