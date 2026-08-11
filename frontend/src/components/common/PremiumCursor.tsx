import { useEffect, useRef, useState } from 'react';
import '../../styles/components/PremiumCursor.css';

interface CursorState {
  type: 'default' | 'text' | 'button' | 'image' | '3d' | 'precise' | 'accordion' | 'card' | 'social';
  text: string;
  color: string;
}

export default function PremiumCursor() {
  const [isActive, setIsActive] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default', text: '', color: '' });

  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Lerp easing: lower = more trailing lag
  const RING_EASING = 0.13;

  // ── 1. Eligibility check (desktop / fine-pointer only) ──────────────────
  useEffect(() => {
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

  // ── 2. RAF-based cursor movement ────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Core follows mouse with zero lag
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
    };

    const renderLoop = () => {
      // Lerp ring toward mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * RING_EASING;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * RING_EASING;

      // Scroll-velocity stretch on the ring
      const stretch = Math.min(Math.abs(scrollVelocity.current) * 0.005, 0.45);
      const scaleY = 1 + stretch;
      const scaleX = 1 - stretch * 0.4;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scaleX}, ${scaleY})`;
      }

      // Decay velocity each frame
      scrollVelocity.current *= 0.88;

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

  // ── 3. Hover-state detection via event delegation ───────────────────────
  useEffect(() => {
    if (!isActive) return;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Walk up to find the nearest element with data-cursor-type
      const cursorTarget = target.closest('[data-cursor-type]') as HTMLElement | null;

      if (cursorTarget) {
        const type = (cursorTarget.getAttribute('data-cursor-type') ?? 'default') as CursorState['type'];
        const text = cursorTarget.getAttribute('data-cursor-text') ?? '';
        const color = cursorTarget.getAttribute('data-cursor-color') ?? '';
        setCursorState({ type, text, color });
      } else {
        // Auto-detect plain text nodes
        const isTextNode = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN', 'LABEL'].includes(target.nodeName);
        if (isTextNode && !target.closest('a, button')) {
          setCursorState({ type: 'text', text: '', color: '' });
        } else {
          setCursorState({ type: 'default', text: '', color: '' });
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
        // Pass color as attribute so CSS [data-cursor-color] selectors work
        data-cursor-color={cursorState.color || undefined}
      >
        <span className="premium-cursor-text">{cursorState.text}</span>
      </div>
    </>
  );
}
