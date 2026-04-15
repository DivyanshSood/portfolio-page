import { useEffect, useState } from 'react';

export const THEMES = [
  { id: 'brutalism',    short: 'BRUT', label: 'Brutalism' },
  { id: 'neomorphism',  short: 'NEO',  label: 'Neomorphism' },
  { id: 'liquid-glass', short: 'GLSS', label: 'Liquid Glass' },
  { id: 'futuristic',   short: 'HUD',  label: 'Futuristic' },
];

const KEY = 'ds-theme';
const DEFAULT = 'brutalism';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT;
    return localStorage.getItem(KEY) || DEFAULT;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return [theme, setTheme];
}
