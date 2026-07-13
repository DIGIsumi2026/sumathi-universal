import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';
import { videoAssets } from '../../data/videoAssets';

export default function AboutHeroVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            setShowThumbnail(true);
          });

          setShowThumbnail(false);
        } else {
          video.pause();
          setShowThumbnail(true);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    const handleEnded = () => {
      setShowThumbnail(true);
      video.currentTime = 0;
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-hero-video">
      <video
        ref={videoRef}
        className="about-hero-video__media"
        src={videoAssets.about.heroVideo}
        muted
        playsInline
        preload="auto"
      />

      <motion.img
        src={imageAssets.about.thumbnail}
        alt="Sumathi Universal diversified services"
        className="about-hero-video__thumbnail"
        draggable={false}
        animate={{
          opacity: showThumbnail ? 1 : 0,
          scale: showThumbnail ? 1 : 1.04,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <div className="about-hero-video__overlay" />

      <div className="about-hero-video__content">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          About Sumathi Universal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          One Group. Multiple Industries. One Vision.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          Explore the connected journey of Sumathi Universal through printing,
          engineering, security, architecture, trading, technology,
          entertainment, ventures, and community-focused initiatives.
        </motion.p>
      </div>
    </section>
  );
}