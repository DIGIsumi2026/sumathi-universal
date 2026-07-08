import { motion } from 'framer-motion';

const brands = ['PayPal', 'ClickUp', 'Reebok', 'Stripe', 'Dribbble', 'Figma'];

export default function ClientsStrip() {
  return (
    <section className="brands-section section-pad-sm">
      <div className="container brands-head">
        <div className="eyebrow"><span /> Brands <b>Trusted Partners</b></div>
        <h2>We Proudly Collaborate With<br />Trusted Brands & Partners</h2>
      </div>
      <motion.div className="brand-marquee" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div>
          {[...brands, ...brands].map((brand, index) => <span key={`${brand}-${index}`}>{brand}</span>)}
        </div>
      </motion.div>
    </section>
  );
}
