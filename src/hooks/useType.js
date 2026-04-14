import { useState, useEffect } from 'react';

const useType = (text, speed = 40, delay = 0) => {
  const [o, setO] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < text.length) { setO(text.slice(0, i + 1)); i++; }
        else clearInterval(iv);
      }, speed);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return o;
};

export default useType;
