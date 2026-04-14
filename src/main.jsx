import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Easter egg — open your console
const g = (c) => `color:${c};font-family:monospace;`;
console.log('%c> divyansh@studio — console unlocked', `${g('#4ade80')}font-size:1.1rem;font-weight:bold;`);
console.log('%c  Hard to believe. All true.', `${g('#67e8f9')}font-size:0.85rem;margin-bottom:4px;`);
console.log('%c→ JavaScript was written in 10 days. It now powers 98% of all websites.', g('#e879f9'));
console.log('%c→ The average webpage today weighs more than the original Doom game (2.5MB).', g('#fb923c'));
console.log('%c→ A 1-second delay in load time cuts conversions by 7%. Every second is revenue.', g('#4ade80'));
console.log('%c→ The first ever computer "bug" was a real moth, taped into a Harvard logbook in 1947.', g('#38bdf8'));
console.log('%c→ Google\'s homepage HTML has a strict 28KB size limit — enforced by engineers to this day.', g('#a78bfa'));
console.log('%c→ 0.05 seconds. That\'s how long a visitor takes to form an opinion about your site.', g('#f472b6'));
console.log('%c→ The first website ever published is still live. It has no images, no CSS, and no JavaScript.', g('#facc15'));
console.log('%c  If you\'re reading this, you know enough to know good work when you see it.', `${g('#4ade80')}font-style:italic;`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
