import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

import Cursor from './components/Cursor';
import Header from './components/Header';

import HomePage    from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import HirePage    from './pages/HirePage';

export default function App() {
  const [page, setPage] = useState('home');
  const [pct,  setPct]  = useState(0);

  /* Scroll progress (resets on page change) */
  useEffect(() => {
    setPct(0);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {/* ── Background ── */}
      <div className="gradient-bg" />
      <Cursor />

      {/* ── Progress bar ── */}
      <div className="scroll-progress" style={{ width: `${pct}%` }} />

      {/* ── Status bar ── */}
      <div className="status-bar">
        <span><span className="status-dot" />ONLINE</span>
        <span>v2.0</span>
      </div>

      {/* ── Fixed header navigation ── */}
      <Header page={page} setPage={changePage} />

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
