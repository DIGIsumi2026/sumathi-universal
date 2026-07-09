import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { servicesGalleryData } from '../../data/servicesGalleryData';

const AUTO_PLAY_DELAY = 6200;

export default function ServicesGalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const navigate = useNavigate();

  const activeService = servicesGalleryData[activeIndex];

  useEffect(() => {
    let loadedCount = 0;

    servicesGalleryData.forEach((service) => {
      const img = new Image();
      img.src = service.image;

      const handleImageDone = () => {
        loadedCount += 1;

        if (loadedCount === servicesGalleryData.length) {
          setImagesReady(true);
        }
      };

      img.onload = handleImageDone;
      img.onerror = handleImageDone;
    });
  }, []);

  useEffect(() => {
    if (!imagesReady) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === servicesGalleryData.length - 1 ? 0 : current + 1
      );
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [imagesReady]);

  if (!imagesReady) {
    return <section className="services-gallery-hero services-gallery-loading" />;
  }

  return (
    <section className="services-gallery-hero">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={activeService.id}
          className="services-gallery-slide"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={activeService.image}
            alt={activeService.title}
            className="services-gallery-image"
            initial={{ scale: 1.12, x: 42 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 1.05, x: -42 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="services-gallery-overlay" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${activeService.id}`}
          className="services-gallery-content"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 36 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="services-gallery-subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            {activeService.subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {activeService.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {activeService.description}
          </motion.p>

          <motion.button
            type="button"
            className="services-gallery-btn"
            onClick={() => navigate('/about')}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            See More
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <div className="services-gallery-left-dots">
        {servicesGalleryData.map((service, index) => (
          <button
            key={service.id}
            type="button"
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${service.title}`}
          />
        ))}
      </div>

      <div className="services-gallery-right-index">
        <span>{activeService.id}</span>

        <div className="services-gallery-progress">
          <motion.div
            key={`progress-${activeService.id}`}
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{
              duration: AUTO_PLAY_DELAY / 1000,
              ease: 'linear',
            }}
          />
        </div>

        <small>{String(servicesGalleryData.length).padStart(2, '0')}</small>
      </div>
    </section>
  );
}