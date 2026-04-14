import React from 'react';
import { Code2 } from 'lucide-react';
import Panel from '../components/Panel';

const stack = [
  { label: 'Frontend', color: 'var(--neon-cyan)', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'] },
  { label: 'Backend', color: 'var(--neon-orange)', items: ['Node.js', 'Express', 'Supabase', 'Firebase', 'REST APIs'] },
  { label: 'Tools & Platforms', color: 'var(--neon-purple)', items: ['Figma', 'Vercel', 'Shopify', 'Git', 'Vite', 'Netlify'] },
];

const Skills = () => (
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

export default Skills;
