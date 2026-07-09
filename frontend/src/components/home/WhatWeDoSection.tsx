import { motion } from 'framer-motion';
import { whatWeDoData } from '../../data/whatWeDoData';
import WhatWeDoOrbit from './WhatWeDoOrbit';

export default function WhatWeDoSection() {
  return (
    <section className="what-we-do-section">
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

          return (
            <motion.article
              key={item.id}
              className="what-we-do-card"
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