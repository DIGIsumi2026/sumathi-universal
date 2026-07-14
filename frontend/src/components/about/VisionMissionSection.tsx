import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

type PanelType = 'vision' | 'mission';

type TypewriterTitleProps = {
  text: string;
};

function TypewriterTitle({ text }: TypewriterTitleProps) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setTypedText('');

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 95);

    return () => {
      window.clearInterval(timer);
    };
  }, [text]);

  return (
    <h2 className="vision-mission-title">
      {typedText}
      <span className="vision-mission-cursor" />
    </h2>
  );
}

const panels = {
  vision: {
    title: 'Vision',
    image: imageAssets.about.vision,
    className: 'vision-copy',
    overlayClass: 'vision-overlay',
    description:
      'To become a dominant force in every industry we operate, contributing to the development of our nation and its citizens.',
  },
  mission: {
    title: 'Mission',
    image: imageAssets.about.mission,
    className: 'mission-copy',
    overlayClass: 'mission-overlay',
    description:
      'To become a sustainable business that brings merit and profitability to society, while upholding the highest level of integrity.',
  },
};

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activePanel, setActivePanel] = useState<PanelType>('vision');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActivePanel(latest >= 0.5 ? 'mission' : 'vision');
  });

  const currentPanel = panels[activePanel];

  return (
    <section ref={sectionRef} className="vision-mission-combined-section">
      <div className="vision-mission-sticky">
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${activePanel}`}
            className="vision-mission-bg-layer"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={currentPanel.image}
              alt={`Sumathi Universal ${currentPanel.title}`}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`overlay-${activePanel}`}
            className={`vision-mission-blue-overlay ${currentPanel.overlayClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${activePanel}`}
            className={`vision-mission-copy ${currentPanel.className}`}
            initial={{
              opacity: 0,
              y: activePanel === 'vision' ? -36 : 36,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: activePanel === 'vision' ? -36 : 36,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <TypewriterTitle text={currentPanel.title} />

            <p>{currentPanel.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}