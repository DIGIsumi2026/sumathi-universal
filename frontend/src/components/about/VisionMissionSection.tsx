import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

type TypewriterTitleProps = {
  text: string;
};

function TypewriterTitle({ text }: TypewriterTitleProps) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(titleRef, {
    once: true,
    amount: 0.35,
  });

  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!isInView) return;

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 115);

    return () => {
      window.clearInterval(timer);
    };
  }, [isInView, text]);

  return (
    <h2 ref={titleRef} className="vision-mission-title">
      {typedText}
      {isInView && <span className="vision-mission-cursor" />}
    </h2>
  );
}

export default function VisionMissionSection() {
  const [isCompactScreen, setIsCompactScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');

    const updateScreenSize = () => {
      setIsCompactScreen(mediaQuery.matches);
    };

    updateScreenSize();

    mediaQuery.addEventListener('change', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  return (
    <section className="vision-mission-section">
      <motion.article
        className="vision-mission-panel vision-panel"
        initial="rest"
        whileHover="hover"
      >
        <motion.div
          className="vision-mission-image-wrap"
          initial={{ scale: 1.02 }}
          whileInView={{ scale: isCompactScreen ? 1.09 : 1.02 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={imageAssets.about.vision}
            alt="Sumathi Universal Vision"
            className="vision-mission-image"
            draggable={false}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <div className="vision-mission-overlay vision-overlay" />

        <motion.div
          className="vision-mission-content vision-content"
          initial={{ opacity: 0, x: -54 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypewriterTitle text="Vision" />

          <p>
            To become a dominant force in every industry we operate,
            contributing to the development of our nation and its citizens.
          </p>
        </motion.div>
      </motion.article>

      <motion.article
        className="vision-mission-panel mission-panel"
        initial="rest"
        whileHover="hover"
      >
        <motion.div
          className="vision-mission-image-wrap"
          initial={{ scale: 1.02 }}
          whileInView={{ scale: isCompactScreen ? 1.09 : 1.02 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={imageAssets.about.mission}
            alt="Sumathi Universal Mission"
            className="vision-mission-image"
            draggable={false}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <div className="vision-mission-overlay mission-overlay" />

        <motion.div
          className="vision-mission-content mission-content"
          initial={{ opacity: 0, x: 54 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypewriterTitle text="Mission" />

          <p>
            To become a sustainable business that brings merit and profitability
            to society, while upholding the highest level of integrity.
          </p>
        </motion.div>
      </motion.article>
    </section>
  );
}