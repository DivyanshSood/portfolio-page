import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Marquee from '../components/Marquee';
import Game from '../components/Game';
import Hero from '../sections/Hero';
import About from '../sections/About';
import WhatYouGet from '../sections/WhatYouGet';
import WhyModern from '../sections/WhyModern';
import Skills from '../sections/Skills';
import Process from '../sections/Process';

gsap.registerPlugin(ScrollTrigger);

const TOTAL = 8;

const ANIMS = [
  { from: { scale: 0.5, rotateX: -25, opacity: 0 },              to: { scale: 1, rotateX: 0, opacity: 1 } },
  { from: { y: 80, opacity: 0 },                                   to: { y: 0, opacity: 1 } },
  { from: { rotateY: 50, x: -120, opacity: 0 },                   to: { rotateY: 0, x: 0, opacity: 1 } },
  { from: { scale: 0.7, rotateZ: -5, opacity: 0 },                to: { scale: 1, rotateZ: 0, opacity: 1 } },
  { from: { rotateY: -50, x: 120, opacity: 0 },                   to: { rotateY: 0, x: 0, opacity: 1 } },
  { from: { y: 120, rotateX: 12, opacity: 0 },                    to: { y: 0, rotateX: 0, opacity: 1 } },
  { from: { scale: 0.4, rotateX: 18, rotateY: -18, opacity: 0 }, to: { scale: 1, rotateX: 0, rotateY: 0, opacity: 1 } },
  { from: { y: 80, scale: 0.85, opacity: 0 },                     to: { y: 0, scale: 1, opacity: 1 } },
];

export default function HomePage() {
  const refs = useRef([]);
  const [act, setAct] = useState(0);

  const setRef = (el, i) => { refs.current[i] = el; };
  const navTo  = (i) => refs.current[i]?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    // Small delay so DOM is settled after page switch
    const id = setTimeout(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        refs.current.forEach((sec, i) => {
          if (!sec) return;
          const inner = sec.querySelector('.section-content');
          if (!inner) return;

          const a = ANIMS[i] || ANIMS[0];
          gsap.set(inner, a.from);

          ScrollTrigger.create({
            trigger: sec, start: 'top 85%', end: 'top 25%', scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              Object.keys(a.from).forEach(k =>
                gsap.set(inner, { [k]: a.from[k] + (a.to[k] - a.from[k]) * p })
              );
            },
            onEnter:     () => setAct(i),
            onEnterBack: () => setAct(i),
          });

          if (i < TOTAL - 1) {
            ScrollTrigger.create({
              trigger: sec, start: 'bottom 55%', end: 'bottom 5%', scrub: 0.5,
              onUpdate: (self) => {
                const p = self.progress;
                gsap.set(inner, { scale: 1 - p * 0.2, opacity: 1 - p, rotateX: p * -6 });
              },
            });
          }
        });
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* Nav dots */}
      <div className="nav-dots">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to section ${i + 1}`}
            className={`nav-dot ${act === i ? 'active' : ''}`}
            onClick={() => navTo(i)}
          />
        ))}
      </div>

      {/* 01 — HERO (extra top padding for fixed header) */}
      <div className="section" ref={el => setRef(el, 0)} style={{ paddingTop: 'calc(6rem + 56px)' }}>
        <Hero />
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
        <div className="section-content"><WhatYouGet /></div>
      </div>

      {/* 05 — WHY MODERN */}
      <div className="section" ref={el => setRef(el, 4)}>
        <div className="section-content"><WhyModern /></div>
      </div>

      {/* 06 — SKILLS */}
      <div className="section" ref={el => setRef(el, 5)}>
        <div className="section-content"><Skills /></div>
      </div>

      {/* 07 — PROCESS */}
      <div className="section" ref={el => setRef(el, 6)}>
        <Process />
      </div>

      {/* 08 — GAME */}
      <div className="section" ref={el => setRef(el, 7)}>
        <div className="section-content"><Game /></div>
      </div>
    </>
  );
}
