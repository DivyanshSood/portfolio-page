import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Shapes from './components/Shapes';
import Header from './components/Header';
import ThemeSwitcher from './components/ThemeSwitcher';

import HomePage    from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import HirePage    from './pages/HirePage';

export default function App() {
  const [page, setPage] = useState('home');
  const [pct,  setPct]  = useState(0);

  /* Lenis smooth scroll — buttery, rAF-driven, momentum-based */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    const onScroll = ({ scroll, limit }) => {
      setPct(limit > 0 ? (scroll / limit) * 100 : 0);
    };
    lenis.on('scroll', onScroll);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    /* Expose for scrollTo on page change */
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => { setPct(0); }, [page]);

  const changePage = (next) => {
    setPage(next);
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {/* ── Background + floating orbs ── */}
      <div className="gradient-bg" />
      <Shapes />
      <Cursor />

      {/* ── Progress bar ── */}
      <div className="scroll-progress" style={{ width: `${pct}%` }} />

      {/* ── Status bar ── */}
      <div className="status-bar">
        <span><span className="status-dot" />ONLINE</span>
        <span>v3.0</span>
      </div>

      {/* ── Fixed header navigation ── */}
      <Header page={page} setPage={changePage} />

      {/* ── Theme switcher ── */}
      <ThemeSwitcher />

      {/* ── Page content ── */}
      {page === 'home'      && <HomePage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'hire'      && <HirePage />}

      <Analytics />

      {/* ── WhatsApp FAB ── */}
      <a
        href="https://wa.me/919816091875"
        target="_blank"
        rel="noreferrer"
        className="wa-btn"
      >
        <MessageCircle size={22} />
      </a>
    </>
  );
}
