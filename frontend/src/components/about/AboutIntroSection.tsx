import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { imageAssets } from '../../data/imageAssets';

export default function AboutIntroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [-20, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

  return (
    <section ref={sectionRef} className="about-intro-section">
      <div className="about-intro-visual">
        <motion.img
          src={imageAssets.about.teamImage}
          alt="Sumathi Universal team"
          className="about-intro-bg"
          draggable={false}
          style={{ scale: imageScale }}
        />

        <div className="about-intro-image-overlay" />

        <motion.h1
            className="about-intro-big-title"
            data-text="ABOUT US"
            style={{
            x: '-50%',
            y: titleY,
            }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
             ABOUT US
            </motion.h1>
        <motion.img
          src={imageAssets.about.teamPeople}
          alt="Sumathi Universal team members"
          className="about-intro-people"
          draggable={false}
          style={{ scale: imageScale }}
        />
      </div>

      <div className="about-intro-caption-wrap">
        <motion.div
          className="about-intro-caption-card"
          initial={{ opacity: 0, y: 38 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            A dedicated Management and Holding Company for a majority of the
            subsidiaries and business units in the Group. The company is a large
            and extensively diversified business conglomerate in Sri Lanka
            responsible for making decisions on the overall Business Strategy
            for the Group and investing in new business ventures while
            overlooking the overall Operations, Finance, HR, IT and
            Administration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}