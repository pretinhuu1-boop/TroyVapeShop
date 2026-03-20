import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      setWidth(pct);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
};

export default ReadingProgress;
