import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import Panel from './Panel';

const Game = () => {
  const [score, setScore] = useState(0);
  const [on, setOn] = useState(false);
  const [time, setTime] = useState(12);
  const [nodes, setNodes] = useState([]);
  const sp = useRef(null);

  useEffect(() => {
    let t;
    if (on && time > 0) t = setInterval(() => setTime(p => p - 1), 1000);
    else if (time === 0) { setOn(false); clearInterval(sp.current); }
    return () => clearInterval(t);
  }, [on, time]);

  useEffect(() => {
    if (on) {
      sp.current = setInterval(() => {
        setNodes(prev => {
          if (prev.length >= 7) return prev;
          const r = Math.random() < 0.2;
          return [...prev, { id: Date.now() + Math.random(), x: Math.random() * 78 + 11, y: Math.random() * 78 + 11, pts: r ? 30 : 10, rare: r }];
        });
      }, 480);
    }
    return () => clearInterval(sp.current);
  }, [on]);

  const go = () => { setScore(0); setTime(12); setNodes([]); setOn(true); };
  const pop = useCallback((id, pts) => {
    if (!on) return;
    setScore(s => s + pts);
    setNodes(p => p.filter(n => n.id !== id));
  }, [on]);

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
        {!on && time === 12 && (
          <div className="game-center">
            <button onClick={go} className="btn" style={{ borderColor: 'var(--neon-red)', color: 'var(--neon-red)' }}>
              <Lock size={14} /> START
            </button>
          </div>
        )}
        {!on && time === 0 && (
          <div className="game-center">
            <p className="heading" style={{ color: 'var(--neon-red)', fontSize: '1.5rem', marginBottom: '0.4rem' }}>GAME OVER</p>
            <p className="mono" style={{ color: 'var(--neon-cyan)', marginBottom: '1rem' }}>{score}mb extracted</p>
            <button onClick={go} className="btn">RETRY</button>
          </div>
        )}
        {on && nodes.map(n => (
          <div
            key={n.id}
            className={`hack-node ${n.rare ? 'rare' : ''}`}
            onClick={() => pop(n.id, n.pts)}
            style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.rare ? 32 : 46, height: n.rare ? 32 : 46 }}
          >
            {n.rare ? 'FF' : '01'}
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default Game;
