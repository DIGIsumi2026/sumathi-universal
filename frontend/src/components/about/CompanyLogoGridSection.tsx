import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { animate, stagger, type JSAnimation } from 'animejs';
import { gsap } from 'gsap';
import { corporateCompanies, getCorporateCompanyPreview, type CorporateCompany } from '../../data/corporateCompanies';

type Geometry = { left: number; width: number; height: number; x: number; y: number };
const hasWebsite = (company: CorporateCompany) => Boolean(company.href?.trim());
const columnCount = () => window.innerWidth > 900 ? 5 : window.innerWidth > 600 ? 3 : 2;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function CompanyLogoGridSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const desktopTimeline = useRef<gsap.core.Timeline | null>(null);
  const mobileAnimations = useRef<JSAnimation[]>([]);
  const previousGeometry = useRef<Geometry | null>(null);
  const transitionId = useRef(0);
  const currentIndex = useRef<number | null>(null);
  const suppressFocus = useRef(false);
  const closingDesktop = useRef(false);
  const [columns, setColumns] = useState(columnCount);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const isDesktop = columns === 5;
  const company = activeIndex === null ? null : corporateCompanies[activeIndex];

  const cancelMobile = useCallback(() => {
    mobileAnimations.current.forEach(animation => animation.cancel());
    mobileAnimations.current = [];
  }, []);
  const activate = useCallback((index: number | null) => {
    currentIndex.current = index;
    setActiveIndex(index);
  }, []);
  const reset = useCallback(() => {
    transitionId.current += 1;
    desktopTimeline.current?.kill();
    cancelMobile();
    previousGeometry.current = null;
    closingDesktop.current = false;
    setGeometry(null);
    activate(null);
  }, [activate, cancelMobile]);

  const measure = useCallback((index: number): Geometry | null => {
    const grid = gridRef.current;
    const tile = tiles.current[index];
    if (!grid || !tile) return null;
    const cellWidth = grid.clientWidth / 5;
    const column = index % 5;
    const left = clamp((column <= 2 ? column + 1 : column - 2) * cellWidth, 0, grid.clientWidth - cellWidth * 2);
    // Layout offsets remain stable while the initial scroll reveal transforms tiles.
    return {
      left,
      width: cellWidth * 2,
      height: grid.clientHeight,
      x: clamp(tile.offsetLeft + tile.offsetWidth - 19 - left, 0, cellWidth * 2),
      y: clamp(tile.offsetTop + 19, 0, grid.clientHeight),
    };
  }, []);

  const openDesktop = useCallback((index: number) => {
    if (!isDesktop || !hasWebsite(corporateCompanies[index])) return;
    if (currentIndex.current === index && !closingDesktop.current) return;
    closingDesktop.current = false;
    const nextGeometry = measure(index);
    if (!nextGeometry) return;
    desktopTimeline.current?.kill();
    activate(index);
    setGeometry(nextGeometry);
    setRevision(value => value + 1);
  }, [activate, isDesktop, measure]);

  const closeDesktop = useCallback(() => {
    if (!isDesktop || currentIndex.current === null) return;
    desktopTimeline.current?.kill();
    closingDesktop.current = true;
    if (!previewRef.current || !geometry || reducedMotion) {
      reset();
      return;
    }
    desktopTimeline.current = gsap.timeline({ onComplete: reset })
      .to(previewRef.current.querySelectorAll('.corporate-company-preview-item'), { opacity: 0, y: 6, duration: 0.18 }, 0)
      .to(previewRef.current, {
        opacity: 0,
        clipPath: `circle(0px at ${geometry.x}px ${geometry.y}px)`,
        duration: 0.44,
        ease: 'power3.inOut',
      }, 0);
  }, [geometry, isDesktop, reducedMotion, reset]);

  const selectInline = useCallback((index: number | null) => {
    if (index !== null && !hasWebsite(corporateCompanies[index])) return;
    const next = index === currentIndex.current ? null : index;
    const token = ++transitionId.current;
    cancelMobile();
    const shell = shellRef.current;
    const preview = previewRef.current;
    if (currentIndex.current === null || !shell || !preview || reducedMotion) {
      activate(next);
      return;
    }
    // Animate from current values so repeated taps safely interrupt a transition.
    shell.style.height = `${shell.getBoundingClientRect().height}px`;
    mobileAnimations.current = [
      animate(preview, { opacity: 0, scale: 0.975, translateY: -6, duration: 260, ease: 'inCubic' }),
      animate(shell, {
        height: 0,
        duration: 430,
        ease: 'inOutCubic',
        onComplete: () => {
          if (transitionId.current === token) activate(next);
        },
      }),
    ];
  }, [activate, cancelMobile, reducedMotion]);

  const dismiss = () => {
    const index = currentIndex.current;
    suppressFocus.current = true;
    tiles.current[index ?? -1]?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
    suppressFocus.current = false;
    if (isDesktop) closeDesktop();
    else selectInline(null);
  };

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let viewportWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      reset();
      setColumns(columnCount());
    };
    const onMotionChange = () => {
      reset();
      setReducedMotion(query.matches);
    };
    window.addEventListener('resize', onResize);
    query.addEventListener('change', onMotionChange);
    return () => {
      window.removeEventListener('resize', onResize);
      query.removeEventListener('change', onMotionChange);
      transitionId.current += 1;
      desktopTimeline.current?.kill();
      cancelMobile();
    };
  }, [cancelMobile, reset]);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!isDesktop || !preview || !geometry || activeIndex === null) return;
    desktopTimeline.current?.kill();
    const content = preview.querySelectorAll('.corporate-company-preview-item');
    const previous = previousGeometry.current;
    if (reducedMotion) {
      gsap.set(preview, { left: geometry.left, width: geometry.width, height: geometry.height, opacity: 1, clipPath: 'none' });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      desktopTimeline.current = gsap.timeline({ defaults: { overwrite: 'auto' } })
        .fromTo(preview, {
          left: previous?.left ?? geometry.left,
          width: previous?.width ?? geometry.width,
          height: previous?.height ?? geometry.height,
          opacity: previous ? 1 : 0,
          clipPath: `circle(${previous ? Math.hypot(previous.width, previous.height) : 0}px at ${geometry.x}px ${geometry.y}px)`,
        }, {
          left: geometry.left,
          width: geometry.width,
          height: geometry.height,
          opacity: 1,
          clipPath: `circle(${Math.hypot(geometry.width, geometry.height)}px at ${geometry.x}px ${geometry.y}px)`,
          duration: previous ? 0.48 : 0.72,
          ease: 'power3.out',
        }, 0)
        .fromTo(content, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.045, ease: 'power3.out' }, previous ? 0.1 : 0.3);
    }
    previousGeometry.current = geometry;
    return () => { desktopTimeline.current?.kill(); };
  }, [activeIndex, geometry, isDesktop, reducedMotion, revision]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const preview = previewRef.current;
    if (isDesktop || !shell || !preview || activeIndex === null) return;
    cancelMobile();
    if (reducedMotion) {
      shell.style.height = 'auto';
      return;
    }
    const token = transitionId.current;
    mobileAnimations.current = [
      animate(shell, {
        height: [0, preview.offsetHeight],
        duration: 590,
        ease: 'outExpo',
        onComplete: () => {
          if (transitionId.current === token) shell.style.height = 'auto';
        },
      }),
      animate(preview, {
        opacity: [0, 1],
        scale: [0.96, 1],
        translateY: [-8, 0],
        clipPath: ['inset(8% 3% 8% 3% round 12px)', 'inset(0% 0% 0% 0% round 0px)'],
        duration: 620,
        ease: 'outExpo',
      }),
    ];
    return cancelMobile;
  }, [activeIndex, cancelMobile, columns, isDesktop, reducedMotion]);

  useEffect(() => {
    const pulses = gridRef.current?.querySelectorAll('.corporate-company-tile:not(.is-active) .corporate-company-plus-pulse');
    if (isDesktop || reducedMotion || !pulses?.length) return;
    const pulse = animate(pulses, {
      opacity: [0.4, 0],
      scale: [0.75, 1.6],
      duration: 1550,
      delay: stagger(140),
      loop: true,
      ease: 'outQuad',
    });
    return () => { pulse.revert(); };
  }, [activeIndex, isDesktop, reducedMotion]);

  const renderPreview = (item: CorporateCompany) => {
    if (!hasWebsite(item)) return null;
    const preview = getCorporateCompanyPreview(item);
    return (
      <div
        key={item.id}
        ref={previewRef}
        id={`company-preview-${item.id}`}
        className={`corporate-company-preview ${isDesktop ? 'is-floating' : 'is-inline'}`}
        role="region"
        aria-labelledby={`company-preview-title-${item.id}`}
        onPointerEnter={() => { if (isDesktop) openDesktop(corporateCompanies.indexOf(item)); }}
      >
        {preview.image ? (
          <img className="corporate-company-preview-image" src={preview.image} alt="" decoding="async" />
        ) : <div className="corporate-company-preview-fallback" />}
        <div className="corporate-company-preview-overlay" />
        <div className="corporate-company-preview-content">
          {preview.metric && <span className="corporate-company-preview-item corporate-company-preview-metric">{preview.metric}</span>}
          <h3 className="corporate-company-preview-item" id={`company-preview-title-${item.id}`}>{preview.title}</h3>
          {preview.subtitle && <p className="corporate-company-preview-item corporate-company-preview-subtitle">{preview.subtitle}</p>}
          {preview.description && <p className="corporate-company-preview-item">{preview.description}</p>}
          {item.href && (
            <a className="corporate-company-preview-item corporate-company-website" href={item.href} target="_blank" rel="noopener noreferrer">
              Visit website <ArrowUpRight size={17} aria-hidden="true" />
              <span className="corporate-company-sr-only"> for {item.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
        <button type="button" className="corporate-company-close" onClick={dismiss} aria-label={`Close ${item.name} details`}><X size={18} aria-hidden="true" /></button>
      </div>
    );
  };

  const rowEnd = activeIndex === null ? null : Math.min(Math.ceil((activeIndex + 1) / columns) * columns - 1, corporateCompanies.length - 1);
  return (
    <div
      className="corporate-company-grid"
      ref={gridRef}
      onPointerLeave={event => { if (event.pointerType !== 'touch') closeDesktop(); }}
      onBlur={event => { if (isDesktop && !event.currentTarget.contains(event.relatedTarget)) closeDesktop(); }}
      onKeyDown={event => { if (event.key === 'Escape' && activeIndex !== null) { event.preventDefault(); dismiss(); } }}
    >
      {corporateCompanies.map((item, index) => {
        const selected = activeIndex === index;
        const interactive = hasWebsite(item);
        const logo = <img src={item.logo} alt={`${item.name} logo`} className="corporate-company-logo" decoding="async" draggable={false} />;
        return (
          <Fragment key={item.id}>
            <div
              ref={element => { tiles.current[index] = element; }}
              className={`corporate-company-tile${interactive ? ' is-interactive' : ''}${selected ? ' is-active' : ''}`}
              style={{ '--company-accent-from': item.accent?.from ?? 'var(--pink)', '--company-accent-to': item.accent?.to ?? 'var(--purple)' } as CSSProperties}
              onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') openDesktop(index); }}
            >
              {interactive ? (
                <button
                  type="button"
                  className="corporate-company-tile-action"
                  aria-label={`${selected && !isDesktop ? 'Close' : 'View'} ${item.name} details`}
                  aria-expanded={selected}
                  aria-controls={selected ? `company-preview-${item.id}` : undefined}
                  onFocus={() => { if (!suppressFocus.current) openDesktop(index); }}
                  onClick={() => { if (isDesktop) openDesktop(index); else selectInline(index); }}
                >
                  {logo}
                  <span className="corporate-company-plus" aria-hidden="true"><span className="corporate-company-plus-pulse" /><Plus size={18} /></span>
                </button>
              ) : <div className="corporate-company-tile-action">{logo}</div>}
            </div>
            {isDesktop && selected && company && renderPreview(company)}
            {!isDesktop && index === rowEnd && company && hasWebsite(company) && (
              <div key={company.id} className="corporate-company-inline-shell" ref={shellRef}>{renderPreview(company)}</div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
