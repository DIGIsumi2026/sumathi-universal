import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { whatWeDoData } from '../../data/whatWeDoData';
import WhatWeDoOrbit from './WhatWeDoOrbit';

// How long each card stays in the "hover" state during the intro
const INTRO_CARD_DURATION = 900; // ms
// Gap between one card finishing and the next starting
const INTRO_CARD_GAP = 250; // ms
// After the section enters view, wait for card entrance animations to finish
// Card 0 entrance: delay=0, duration=0.7s → done at ~750ms
// Card 3 entrance: delay=0.3s, duration=0.7s → done at ~1050ms
// We wait until card 0 is fully rendered before its intro starts
const POST_ENTER_DELAY = 850; // ms — safely after card 0's 0.7s entrance anim

export default function WhatWeDoSection() {
  const [introIndex, setIntroIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const firedRef   = useRef(false); // run only once per page load

  useEffect(() => {
    // Desktop only — matches the CSS breakpoint
    if (window.innerWidth <= 1180) return;

    const startSequence = () => {
      if (firedRef.current) return;
      firedRef.current = true;

      whatWeDoData.forEach((_, i) => {
        const startTime = POST_ENTER_DELAY + i * (INTRO_CARD_DURATION + INTRO_CARD_GAP);
        const endTime   = startTime + INTRO_CARD_DURATION;

        const t1 = setTimeout(() => setIntroIndex(i), startTime);
        const t2 = setTimeout(() => setIntroIndex(prev => (prev === i ? null : prev)), endTime);

        timersRef.current.push(t1, t2);
      });
    };

    // Watch for the section entering the viewport for desktop intro
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startSequence();
          observer.disconnect(); // only need one trigger
        }
      },
      {
        // Fire when at least 20% of the section is visible
        threshold: 0.2,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // Mobile scroll-spy for active cards
  useEffect(() => {
    if (window.innerWidth > 1180) return;
    const cards = document.querySelectorAll('.what-we-do-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('what-we-do-card--mobile-active');
          } else {
            entry.target.classList.remove('what-we-do-card--mobile-active');
          }
        });
      },
      {
        
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="what-we-do-section">
      <WhatWeDoOrbit />

      <div className="what-we-do-header">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          Our Services
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          What We Do
        </motion.h2>
      </div>

      <div className="what-we-do-grid">
        {whatWeDoData.map((item, index) => {
          const Icon = item.icon;
          const isIntroActive = introIndex === index;

          return (
            <motion.article
              key={item.id}
              className={`what-we-do-card${isIntroActive ? ' what-we-do-card--intro-active' : ''}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="what-we-do-card-image"
                draggable={false}
              />

              <div className="what-we-do-card-overlay" />

              <div className="what-we-do-card-content">
                <div className="what-we-do-icon">
                  <Icon size={32} strokeWidth={1.8} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}