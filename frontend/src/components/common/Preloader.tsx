import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';

const MIN_VISIBLE_MS = 500;
const MAX_ASSET_WAIT_MS = 3000;
const FADE_MS = 200;

interface PreloaderProps {
  pageReady: boolean;
  contentRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

export default function Preloader({ pageReady, contentRef, onComplete }: PreloaderProps) {
  const startedAt = useRef(performance.now());
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    // This becomes true only after the new route's Suspense boundary commits.
    if (!pageReady) return;

    let cancelled = false;
    let minimumTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;
    let assetTimer: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    const images = Array.from(contentRef.current?.querySelectorAll('img') ?? []).filter((image) => {
      const rect = image.getBoundingClientRect();
      return image.loading !== 'lazy' && rect.top < window.innerHeight && rect.bottom > 0;
    });

    const imagePromises = images.map((image) => new Promise<void>((resolve) => {
      if (image.complete) { resolve(); return; }
      image.addEventListener('load', () => resolve(), { once: true, signal: controller.signal });
      image.addEventListener('error', () => resolve(), { once: true, signal: controller.signal });
    }));
    const assetsReady = Promise.all([
      ...imagePromises,
      document.fonts?.ready.catch(() => undefined),
    ]);
    const timeout = new Promise<void>((resolve) => {
      assetTimer = setTimeout(resolve, MAX_ASSET_WAIT_MS);
    });

    // Broken/slow media must never trap the visitor behind the overlay.
    void Promise.race([assetsReady, timeout]).then(() => {
      if (cancelled) return;
      clearTimeout(assetTimer);
      controller.abort();
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt.current));
      minimumTimer = setTimeout(() => {
        setLeaving(true);
        fadeTimer = setTimeout(onComplete, FADE_MS);
      }, remaining);
    });

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(assetTimer);
      clearTimeout(minimumTimer);
      clearTimeout(fadeTimer);
    };
  }, [pageReady, contentRef, onComplete]);

  return createPortal(
    <div
      className={`page-preloader${leaving ? ' page-preloader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      data-lenis-prevent
    >
      <img
        src={`${import.meta.env.BASE_URL}preloader-logo.png`}
        alt="Sumathi Universal"
        className="page-preloader__logo"
        fetchPriority="high"
      />
    </div>,
    document.body,
  );
}
