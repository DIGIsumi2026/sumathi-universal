import { useEffect, useRef, useState } from 'react';
import '../../styles/components/PremiumCursor.css';

interface CursorState {
  type: 'default' | 'text' | 'button' | 'image' | '3d' | 'precise' | 'accordion' | 'card';
  text: string;
}

export default function PremiumCursor() {
  const [isActive, setIsActive] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default', text: '' });
  
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number>();
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Constants for movement
  const RING_EASING = 0.15; // Lower is more lag/smooth

  useEffect(() => {
    // 1. Initial Checks (Mobile, Touch, Reduced Motion)
    const checkEligibility = () => {
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isDesktopWidth = window.innerWidth > 1024;
      const wantsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (isFinePointer && isDesktopWidth && !wantsReducedMotion) {
        setIsActive(true);
        document.body.classList.add('premium-cursor-active');
      } else {
        setIsActive(false);
        document.body.classList.remove('premium-cursor-active');
      }
    };

    checkEligibility();
    window.addEventListener('resize', checkEligibility);

    return () => {
      window.removeEventListener('resize', checkEligibility);
      document.body.classList.remove('premium-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Update core immediately for zero-lag feel
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY.current;
      scrollVelocity.current = velocity;
      lastScrollY.current = currentScrollY;
    };

    // Render loop for the trailing ring
    const renderLoop = () => {
      // Lerp ring position to mouse position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * RING_EASING;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * RING_EASING;

      // Scroll stretch effect
      const stretch = Math.min(Math.abs(scrollVelocity.current) * 0.005, 0.5); // Max 1.5x stretch
      const scaleY = 1 + stretch;
      const scaleX = 1 - (stretch * 0.5); // Squeeze slightly

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scaleX}, ${scaleY})`;
      }

      // Decay scroll velocity
      scrollVelocity.current *= 0.9;

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    requestRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive]);

  // Event Delegation for hover states
  useEffect(() => {
    if (!isActive) return;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for the closest element with data-cursor-type
      const cursorTarget = target.closest('[data-cursor-type]') as HTMLElement;
      
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor-type') as CursorState['type'];
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorState({ type, text });
      } else {
        // Automatically handle text tags if no explicit data-cursor
        const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN'].includes(target.nodeName);
        if (isText && !target.closest('a, button')) {
           setCursorState({ type: 'text', text: '' });
        } else {
           setCursorState({ type: 'default', text: '' });
        }
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    return () => document.removeEventListener('mouseover', onMouseOver);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <div 
        ref={coreRef} 
        className={`premium-cursor-core state-${cursorState.type}`} 
      />
      <div 
        ref={ringRef} 
        className={`premium-cursor-ring state-${cursorState.type}`}
      >
        <span className="premium-cursor-text">{cursorState.text}</span>
      </div>
    </>
  );
}
