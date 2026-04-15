import React from 'react';
import useTheme, { THEMES } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Design theme">
      <span className="theme-switcher-label">THEME</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          title={t.label}
          onClick={() => setTheme(t.id)}
          className={`theme-switcher-btn${theme === t.id ? ' active' : ''}`}
          data-theme-id={t.id}
        >
          {t.short}
        </button>
      ))}
    </div>
  );
}
