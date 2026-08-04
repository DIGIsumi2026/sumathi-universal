import { useEffect, useRef, useState, useCallback } from 'react';
import '../../styles/components/customScrollbar.css';

export default function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);

  const dragStartY = useRef(0);
  const dragStartScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- compute thumb geometry ---
  const computeThumb = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const trackHeight = trackRef.current?.clientHeight ?? winHeight;

    const ratio = winHeight / docHeight;
    const height = Math.max(Math.round(ratio * trackHeight), 36);
    const scrollTop = window.scrollY;
    const maxScroll = docHeight - winHeight;
    const top = maxScroll > 0
      ? Math.round((scrollTop / maxScroll) * (trackHeight - height))
      : 0;

    setThumbHeight(height);
    setThumbTop(top);
  }, []);

  // --- show thumb, then auto-hide after 1.4 s ---
  const showThumb = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging) setVisible(false);
    }, 1400);
  }, [dragging]);

  // --- scroll handler ---
  useEffect(() => {
    const onScroll = () => {
      computeThumb();
      showThumb();
    };
    const onResize = () => computeThumb();

    computeThumb();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [computeThumb, showThumb]);

  // --- watch sidebar-active body class ---
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setSidebarActive(document.body.classList.contains('sidebar-active'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // --- drag logic ---
  const onThumbPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStartY.current = e.clientY;
    dragStartScrollY.current = window.scrollY;
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onPointerMove = (e: PointerEvent) => {
      const trackHeight = trackRef.current?.clientHeight ?? window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      const dy = e.clientY - dragStartY.current;
      const scrollRatio = dy / (trackHeight - thumbHeight);
      const newScroll = Math.min(
        Math.max(dragStartScrollY.current + scrollRatio * maxScroll, 0),
        maxScroll
      );
      window.scrollTo({ top: newScroll, behavior: 'instant' as ScrollBehavior });
      computeThumb();
    };

    const onPointerUp = () => {
      setDragging(false);
      hideTimer.current = setTimeout(() => setVisible(false), 1400);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [dragging, thumbHeight, computeThumb]);

  // --- click on track (jump to position) ---
  const onTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || e.target === thumbRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = trackRef.current.clientHeight;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const ratio = (clickY - thumbHeight / 2) / (trackHeight - thumbHeight);
    window.scrollTo({ top: Math.min(Math.max(ratio * maxScroll, 0), maxScroll), behavior: 'smooth' });
  }, [thumbHeight]);

  if (sidebarActive) return null;

  return (
    <div
      ref={trackRef}
      className={`custom-scrollbar-track${visible || dragging ? ' custom-scrollbar-track--visible' : ''}`}
      onClick={onTrackClick}
      role="scrollbar"
      aria-orientation="vertical"
      aria-valuenow={Math.round((window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={thumbRef}
        className={`custom-scrollbar-thumb${dragging ? ' custom-scrollbar-thumb--dragging' : ''}`}
        style={{ height: thumbHeight, transform: `translateY(${thumbTop}px)` }}
        onPointerDown={onThumbPointerDown}
      />
    </div>
  );
}
