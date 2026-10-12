import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CompanyLogoGridSection from './CompanyLogoGridSection';
import '../../styles/components/corporate-companies.css';

export default function CompanyTimelineHero() {
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const heading = section.querySelector('.corporate-companies-heading');
    const tiles = section.querySelectorAll('.corporate-company-tile');
    let observer: IntersectionObserver | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let revealed = false;
    const context = gsap.context(() => {
      if (motionQuery.matches) return;
      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(tiles, { opacity: 0, y: 18 });
    }, section);
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      observer?.disconnect();
      context.add(() => {
        timeline = gsap.timeline()
          .to(heading, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0)
          .to(tiles, { opacity: 1, y: 0, duration: 0.7, stagger: 0.055, ease: 'power3.out' }, 0.16);
      });
    };
    const applyMotionPreference = () => {
      if (!motionQuery.matches) return;
      revealed = true;
      observer?.disconnect();
      timeline?.kill();
      gsap.set([heading, ...tiles], { opacity: 1, y: 0 });
    };
    if (!motionQuery.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) reveal();
      }, { threshold: 0.12 });
      observer.observe(section);
    } else {
      gsap.set([heading, ...tiles], { opacity: 1, y: 0 });
    }
    motionQuery.addEventListener('change', applyMotionPreference);
    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener('change', applyMotionPreference);
      timeline?.kill();
      context.revert();
    };
  }, []);
  return (
    <section className="corporate-companies" ref={sectionRef} aria-labelledby="companies-heading">
      <div className="corporate-companies-container">
        <header className="corporate-companies-heading">
          <h2 id="companies-heading">Companies</h2>
          <p>A portfolio shaped by entrepreneurship, strategic investment and long-term leadership.</p>
        </header>
        <CompanyLogoGridSection />
      </div>
    </section>
  );
}
