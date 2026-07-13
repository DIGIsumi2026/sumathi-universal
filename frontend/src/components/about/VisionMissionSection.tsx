import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

type TypewriterTitleProps = {
  text: string;
};

function TypewriterTitle({ text }: TypewriterTitleProps) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const hasTypedRef = useRef(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTypedRef.current) return;

        hasTypedRef.current = true;

        let index = 0;

        const timer = window.setInterval(() => {
          index += 1;
          setTypedText(text.slice(0, index));

          if (index >= text.length) {
            window.clearInterval(timer);
          }
        }, 115);
      },
      {
        threshold: 0.45,
      }
    );

    observer.observe(title);

    return () => {
      observer.disconnect();
    };
  }, [text]);

  return (
    <h2 ref={titleRef} className="vision-mission-title">
      {typedText}
      <span className="vision-mission-cursor" />
    </h2>
  );
}

export default function VisionMissionSection() {
  return (
    <section className="vision-mission-section">
      <article className="vision-mission-panel vision-panel">
        <img
          src={imageAssets.about.vision}
          alt="Sumathi Universal vision"
          className="vision-mission-image"
          draggable={false}
        />

        <div className="vision-mission-overlay vision-overlay" />

        <motion.div
          className="vision-mission-content vision-content"
          initial={{ opacity: 0, x: -54 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypewriterTitle text="Vision" />

          <p>
            To become a dominant force in every industry we operate,
            contributing to the development of our nation and its citizens.
          </p>
        </motion.div>
      </article>

      <article className="vision-mission-panel mission-panel">
        <img
          src={imageAssets.about.mission}
          alt="Sumathi Universal mission"
          className="vision-mission-image"
          draggable={false}
        />

        <div className="vision-mission-overlay mission-overlay" />

        <motion.div
          className="vision-mission-content mission-content"
          initial={{ opacity: 0, x: 54 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypewriterTitle text="Mission" />

          <p>
            To become a sustainable business that brings merit and profitability
            to society, while upholding the highest level of integrity.
          </p>
        </motion.div>
      </article>
    </section>
  );
}