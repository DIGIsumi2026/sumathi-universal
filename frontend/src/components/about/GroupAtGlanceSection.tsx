import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Globe2, Handshake, Landmark } from 'lucide-react';
import GroupGlanceParticles from './GroupGlanceParticles';

const stats = [
  {
    value: 9,
    suffix: '+',
    label: 'Subsidiary Companies',
    icon: Building2,
  },
  {
    value: 4,
    suffix: '+',
    label: 'Associate Companies',
    icon: Handshake,
  },
  {
    value: 6,
    suffix: '+',
    label: 'Industries Operated',
    icon: Globe2,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Years of Business Legacy',
    icon: Landmark,
  },
];

type CountNumberProps = {
  value: number;
  suffix: string;
  start: boolean;
};

function CountNumber({ value, suffix, start }: CountNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frameId = 0;
    let startTime: number | null = null;
    const duration = 1300;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * value);

      setCount(currentValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [start, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function GroupAtGlanceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
  });

  return (
    <section ref={sectionRef} className="group-glance-section">
      <GroupGlanceParticles />

      <div className="group-glance-inner">
        <motion.div
          className="group-glance-header"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Group at a Glance</span>

          <h2>
            Built on Scale,
            <br />
            Diversity and Legacy
          </h2>

          <p>
            A strong foundation of diversified businesses, strategic
            partnerships, and decades of trust that continue to drive our
            growth.
          </p>
        </motion.div>

        <div className="group-glance-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                className="group-glance-card"
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="group-glance-icon">
                  <Icon size={34} strokeWidth={1.7} />
                </div>

                <h3>
                  <CountNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    start={isInView}
                  />
                </h3>

                <div className="group-glance-divider" />

                <p>{stat.label}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}