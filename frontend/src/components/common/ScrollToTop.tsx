import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const PROGRESS_RADIUS = 29;

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setShow(scrollTop > 300);
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top${show ? ' visible' : ''}`}
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="scroll-top__progress" viewBox="0 0 64 64" aria-hidden="true">
        <circle
          className="scroll-top__track"
          cx="32"
          cy="32"
          r={PROGRESS_RADIUS}
          pathLength="100"
        />
        <circle
          className="scroll-top__progress-value"
          cx="32"
          cy="32"
          r={PROGRESS_RADIUS}
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
        />
      </svg>
      <span className="scroll-top__inner">
        <ArrowUp size={19} strokeWidth={2.5} />
      </span>
    </button>
  );
}
