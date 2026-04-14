import React from 'react';

const PAGES = [
  { id: 'home',      label: 'HOME' },
  { id: 'portfolio', label: 'PORTFOLIO' },
  { id: 'hire',      label: 'HIRE' },
];

export default function Header({ page, setPage }) {
  return (
    <header className="site-header">
      {/* Logo */}
      <button className="site-logo" onClick={() => setPage('home')}>
        DS<span className="site-logo-dot">.</span>
      </button>

      {/* Nav */}
      <nav className="site-nav">
        {PAGES.map(p => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            className={`site-nav-btn ${page === p.id ? 'active' : ''}`}
          >
            {p.label}
            {page === p.id && <span className="nav-active-bar" />}
          </button>
        ))}
      </nav>
    </header>
  );
}
