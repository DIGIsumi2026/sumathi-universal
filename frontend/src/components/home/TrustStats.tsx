import { motion } from 'framer-motion';
import { PackageCheck, Rocket, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: PackageCheck, value: '25.4k+', label: 'Trusted Projects' },
  { icon: Rocket, value: '55.6k+', label: 'Prints Delivered' },
  { icon: ShieldCheck, value: '99%', label: 'Quality Assurance' }
];

export default function TrustStats() {
  return (
    <section className="trust-section section-pad-sm">
      <div className="container trust-grid">
        <motion.div className="trust-image-card" initial={{ opacity: 0, x: -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="mock-box red">MOC<br />KUP</div>
          <div className="mock-box blue">Envelope<br />Mockup</div>
        </motion.div>
        <motion.div className="trust-copy" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="eyebrow"><span /> Why We Stand Out</div>
          <h2>We combine quality, speed & reliability in every project.</h2>
          <p>From custom apparel and product packaging to large format campaigns, our team keeps every order sharp, fast, and ready for your customers.</p>
        </motion.div>
        <div className="stat-column">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.label} className="stat-card" initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }} viewport={{ once: true }}>
                <Icon size={34} />
                <div><strong>{item.value}</strong><span>{item.label}</span></div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
